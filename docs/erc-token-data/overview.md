---
sidebar_position: 1
title: Introduction
---

# Hgraph's Hedera ERC Token Data

Hgraph's Hedera ERC Indexer provides comprehensive access to pure ERC-20 and ERC-721 token data on the Hedera network through our GraphQL API. The indexer discovers and tracks tokens deployed directly to Hedera's EVM, analyzes Transfer events, extracts metadata, and calculates token balances for fast queries.

:::info In Beta → Hgraph's Hedera ERC Token Data

This new data service is currently in beta and we encourage all users to provide feedback. Please [contact us to share your input](../overview/contact.md).

:::

## Token Types on Hedera

### Key Distinction

The Hedera ERC Indexer focuses on **pure ERC token contracts** deployed directly to
Hedera's EVM, NOT Hedera Token Service (HTS) tokens with ERC facades.

#### Pure ERC Tokens (What This Indexer Tracks)

- Smart contracts deployed directly to the EVM
- Generate real Transfer events from contract code
- NOT in the `public.token` table (only in `public.entity` as CONTRACT)
- Examples: amWHBAR, amUSDC, Aave-style tokens

#### HTS Tokens with ERC Facades (Excluded)

- Native Hedera Token Service tokens
- Found in the `public.token` table
- Use derived "long-zero" addresses

## What's Available

Hgraph's Hedera ERC Indexer continuously tracks pure ERC token contracts deployed to Hedera's EVM and exposes this data via GraphQL API, providing real-time access to:

- ERC-20 token metadata and balances
- ERC-721 NFT collections and individual NFTs
- Token holder information
- Account portfolios across all tokens
- Historical and statistical data

## Getting Started

### API Access

To access the ERC token data, you'll need:

1. An Hgraph API key - [See authentication documentation](/hgraph-sdk/endpoints-authorization)
2. GraphQL endpoint:
   - Testnet: `https://testnet.hedera.api.hgraph.io/v1/graphql`
   - Mainnet: `https://mainnet.hedera.api.hgraph.io/v1/graphql`

### Quick Example

```graphql
query GetERC20Tokens {
  erc_beta_token(
    where: {contract_type: {_eq: "ERC_20"}}
    limit: 10
    order_by: {transfer_count: desc_nulls_last}
  ) {
    token_id
    name
    symbol
    decimals
    evm_address
    metadata_reliability_score
    processing_timestamp
    total_supply
    transfer_count
    created_timestamp
    contract_type
  }
}}
```

For more query examples, see our [comprehensive query library](./queries).

## Available Data

The GraphQL API provides access to three main data types:

- **Token Information** (`erc_beta_token`) - Token metadata, contract types, and statistics
- **Token Balances** (`erc_beta_token_account`) - Account balances and holder information
- **NFT Details** (`erc_beta_nft`) - Individual NFT ownership and metadata

For detailed schema information, see the [Schema Reference](./schema-reference).

## ERC vs HTS (Understanding Token Types)

Hedera has two types of ERC-compatible tokens:

1. **Pure ERC Tokens** - Standard smart contracts deployed directly to the EVM (tracked by this indexer)
2. **HTS Tokens with ERC Facades** - Native Hedera Token Service tokens (not included in this data)

For a detailed explanation of the differences, see [Token Types](./token-types).

## Additional Resources

- **[Schema Reference](./schema-reference)** - Detailed field descriptions and data types
- **[Token Types](./token-types)** - Understanding pure ERC vs HTS tokens
- **[Technical Details](./technical-details)** - Event signatures, account identifiers, and reliability scoring
- **[Query Examples](./queries)** - Comprehensive GraphQL query library
- **[Authentication](/hgraph-sdk/endpoints-authorization)** - API key setup and usage
