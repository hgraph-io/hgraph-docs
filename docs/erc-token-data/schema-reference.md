---
sidebar_position: 3
---

# Schema Reference

The GraphQL API provides access to ERC token data through three main tables. This page details the available fields, data types, and relationships.

## erc_beta_token

Stores metadata for pure ERC-20 and ERC-721 token contracts deployed to Hedera's EVM.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `token_id` | bigint | Hedera entity ID for the contract |
| `evm_address` | string | Contract's EVM address (0x format) |
| `contract_type` | string | Token type: `ERC_20`, `ERC_721`, `UNKNOWN`, or `FAILED_DEPLOYMENT` |
| `name` | string | Token name |
| `symbol` | string | Token symbol |
| `decimals` | bigint | Decimal places (ERC-20 only, NULL for ERC-721) |
| `total_supply` | numeric | Total token supply (handles uint256 values) |
| `metadata_reliability_score` | decimal | Quality score from 0.00 to 1.00 |
| `created_timestamp` | bigint | Contract creation time (nanoseconds since epoch) |
| `transfer_count` | bigint | Total number of Transfer events |
| `processing_timestamp` | bigint | Last processing time (seconds since epoch) |

### Token Features

- Primary storage for token contract metadata
- Distinguishes between ERC-20 and ERC-721 standards
- Tracks deployment failures and unknown contract types
- Includes reliability scoring for metadata quality

## erc_beta_token_account

Tracks ERC-20 balances and ERC-721 ownership counts with unified account tracking.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `account_id` | bigint | Hedera account ID (resolved from EVM addresses) |
| `token_id` | bigint | References erc_beta_token |
| `balance` | numeric | Token balance (wei for ERC-20, NFT count for ERC-721) |
| `balance_timestamp` | bigint | Last balance update (nanoseconds since epoch) |
| `created_timestamp` | bigint | First association time (nanoseconds since epoch) |
| `associated` | boolean | Always true for pure ERC tokens |

### Account Features

- All addresses resolved to Hedera account IDs (no fragmentation)
- EVM addresses automatically resolved via account-num aliases or entity lookups
- Stores balances as NUMERIC to handle uint256 values
- For ERC-20: Balance in wei (smallest unit)
- For ERC-721: Count of NFTs owned by account
- Primary key: (token_id, account_id) ensures one balance per account-token pair

## erc_beta_nft

Tracks individual NFTs within ERC-721 collections.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `token_id` | bigint | References the ERC-721 contract in erc_beta_token |
| `serial_number` | numeric | The individual NFT's tokenId (supports full uint256 range) |
| `account_id` | bigint | Current owner's Hedera account ID (NULL for unresolved addresses) |
| `deleted` | boolean | Burn status (true if NFT was burned) |
| `metadata` | bytea | Metadata URI (e.g., ipfs://... or https://...) |
| `created_timestamp` | bigint | When NFT was first minted (nanoseconds since epoch) |
| `processing_timestamp` | bigint | When this record was processed (seconds since epoch) |

### NFT Features

- Individual NFT ownership tracking by tokenId
- Automatic tokenURI metadata extraction for all NFTs
- Burn status tracking via deleted flag
- Supports full uint256 range for tokenIds

## Data Types and Constraints

### Numeric Types

- **BIGINT**: Used for Hedera IDs, timestamps, and counts
- **NUMERIC**: Used for balances and supplies (handles uint256 values up to 2^256-1)
- **DECIMAL(3,2)**: Used for reliability scores (0.00 to 1.00)

### Timestamp Formats

- **created_timestamp**: Nanoseconds since epoch (Hedera format)
- **balance_timestamp**: Nanoseconds since epoch (Hedera format)
- **processing_timestamp**: Seconds since epoch (standard Unix time)

### Contract Types

Valid values for `contract_type` field:

- `ERC_20`: Standard ERC-20 fungible token
- `ERC_721`: Standard ERC-721 NFT collection
- `UNKNOWN`: Contract type could not be determined
- `FAILED_DEPLOYMENT`: Contract deployment failed

## Metadata Reliability Score

The `metadata_reliability_score` field indicates the quality of extracted metadata:

### ERC-20 Tokens (4 fields)

Scoring based on: name, symbol, decimals, totalSupply

- **1.00**: All 4 fields extracted successfully
- **0.75**: 3 of 4 fields extracted
- **0.50**: 2 of 4 fields extracted
- **0.25**: 1 of 4 fields extracted
- **0.00**: No metadata extracted

### ERC-721 NFTs (3 fields)

Scoring based on: name, symbol, totalSupply

- **1.00**: All 3 fields extracted successfully
- **0.67**: 2 of 3 fields extracted
- **0.33**: 1 of 3 fields extracted
- **0.00**: No metadata extracted

### Unknown/Failed Deployments

- **1.00**: Both name and symbol extracted
- **0.50**: Either name OR symbol extracted
- **0.00**: No metadata extracted

## Relationships

The tables are related as follows:

```text
erc_beta_token (1) ─────────────┬──── (*) erc_beta_token_account
                                │
                                └──── (*) erc_beta_nft
```

- One token can have many account balances
- One token can have many NFTs (for ERC-721 tokens)
- Account balances reference tokens via `token_id`
- NFTs reference their collection via `token_id`

## Query Examples

### Get token with its holders

```graphql
query TokenWithHolders($tokenId: bigint!) {
  erc_beta_token_by_pk(token_id: $tokenId) {
    name
    symbol
    contract_type
    token_accounts {
      account_id
      balance
    }
  }
}
```

### Get NFT collection with individual NFTs

```graphql
query NFTCollection($tokenId: bigint!) {
  erc_beta_token_by_pk(token_id: $tokenId) {
    name
    symbol
    nfts(where: { deleted: { _eq: false } }) {
      serial_number
      account_id
      metadata
    }
  }
}
```

For more comprehensive query examples, see the [Query Examples](./queries) page.
