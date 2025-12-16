---
sidebar_position: 3
title: Schema Overview
---

# Schema Reference

The GraphQL API provides access to ERC token data through five tables. This page details the available fields, data types, and relationships.

## erc_token

Stores metadata for pure ERC-20, ERC-721, and ERC-1400 token contracts deployed to Hedera's EVM.

### Fields

| Field                        | Type    | Description                                                        |
| ---------------------------- | ------- | ------------------------------------------------------------------ |
| `token_id`                   | bigint  | Hedera entity ID for the contract                                  |
| `token_evm_address`          | string  | Contract's EVM address (0x format)                                 |
| `contract_type`              | string  | Token type: `ERC_20`, `ERC_721`, `ERC_1400`, `UNKNOWN`, or `FAILED_DEPLOYMENT` |
| `name`                       | string  | Token name                                                         |
| `symbol`                     | string  | Token symbol                                                       |
| `decimals`                   | bigint  | Decimal places (ERC-20 and ERC-1400, NULL for ERC-721)             |
| `total_supply`               | numeric | Total token supply (handles uint256 values)                        |
| `metadata_reliability_score` | decimal | Quality score from 0.00 to 1.00                                    |
| `created_timestamp`          | bigint  | Contract creation time (nanoseconds since epoch)                   |
| `processing_timestamp`       | bigint  | Last processing time (nanoseconds since epoch)                     |
| `transfers_indexed_timestamp`| bigint  | Last indexed transfer timestamp (nanoseconds, NULL if not indexed) |

### Token Features

- Primary storage for token contract metadata
- Distinguishes between ERC-20, ERC-721, and ERC-1400 standards
- Tracks deployment failures and unknown contract types
- Includes reliability scoring for metadata quality

## erc_token_account

Tracks ERC-20/ERC-1400 balances and ERC-721 ownership counts with unified account tracking.

### Fields

| Field               | Type    | Description                                           |
| ------------------- | ------- | ----------------------------------------------------- |
| `account_id`        | bigint  | Hedera account ID (resolved from EVM addresses)       |
| `token_id`          | bigint  | References erc_token                                  |
| `token_evm_address` | text    | Original EVM address used for balance lookup          |
| `balance`           | numeric | Token balance (wei for ERC-20/ERC-1400, NFT count for ERC-721) |
| `balance_timestamp` | bigint  | Last balance update (nanoseconds since epoch)         |
| `created_timestamp` | bigint  | First association time (nanoseconds since epoch)      |
| `associated`        | boolean | Always true for pure ERC tokens                       |

### Account Features

- All addresses resolved to Hedera account IDs (no fragmentation)
- EVM addresses automatically resolved via account-num aliases or entity lookups
- Stores balances as NUMERIC to handle uint256 values
- For ERC-20/ERC-1400: Balance in wei (smallest unit)
- For ERC-721: Count of NFTs owned by account
- Primary key: (token_id, account_id) ensures one balance per account-token pair

## erc_nft

Tracks individual NFTs within ERC-721 collections.

### Fields

| Field                  | Type    | Description                                                       |
| ---------------------- | ------- | ----------------------------------------------------------------- |
| `token_id`             | bigint  | References the ERC-721 contract in erc_token                 |
| `serial_number`        | numeric | The individual NFT's tokenId (supports full uint256 range)        |
| `account_id`           | bigint  | Current owner's Hedera account ID (NULL for unresolved addresses) |
| `deleted`              | boolean | Burn status (true if NFT was burned)                              |
| `metadata`             | bytea   | Metadata URI (e.g., ipfs://... or https://...)                    |
| `created_timestamp`    | bigint  | When NFT was first minted (nanoseconds since epoch)               |
| `processing_timestamp` | bigint  | When this record was processed (nanoseconds since epoch)          |

### NFT Features

- Individual NFT ownership tracking by tokenId
- Automatic tokenURI metadata extraction for all NFTs
- Burn status tracking via deleted flag
- Supports full uint256 range for tokenIds

:::note
Many NFTs have NULL `account_id` values. This occurs when the owner is a pure EVM address that has never interacted with Hedera native services (no HBAR transfers, no HTS usage). These addresses exist only in the EVM layer and cannot be resolved to Hedera account IDs. The `erc_token_account` balance table only includes resolved owners.
:::

## erc_token_transfer

Stores transfer history for ERC-20 and ERC-1400 fungible tokens.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `token_id` | bigint | Hedera contract ID for the token |
| `consensus_timestamp` | bigint | Transfer time (nanoseconds since epoch) |
| `log_index` | integer | Event index within transaction |
| `token_evm_address` | text | EVM address of token contract |
| `contract_type` | varchar | Token type: `ERC_20` or `ERC_1400` |
| `transaction_hash` | text | Transaction hash |
| `payer_account_id` | bigint | Hedera account ID of transaction payer |
| `payer_evm_address` | text | EVM address of payer |
| `transfer_type` | varchar | Type: `transfer`, `mint`, `burn`, `partition_mint`, `partition_transfer`, `partition_burn` |
| `sender_account_id` | bigint | Sender's Hedera account ID (NULL for mints) |
| `sender_evm_address` | text | Sender's EVM address |
| `receiver_account_id` | bigint | Receiver's Hedera account ID (NULL for burns) |
| `receiver_evm_address` | text | Receiver's EVM address |
| `amount` | numeric | Transfer amount in smallest unit (wei) |
| `partition_id` | text | ERC-1400 partition identifier (NULL for ERC-20) |
| `operator_account_id` | bigint | Operator account ID (ERC-1400 only) |
| `operator_evm_address` | text | Operator EVM address (ERC-1400 only) |

### Account ID Resolution

:::note
The `*_account_id` fields may be NULL for pure EVM addresses that haven't interacted with Hedera native services. Use the corresponding `*_evm_address` fields as a fallback when account IDs are unavailable.
:::

### Transfer Types

| Type | Standard | Description |
|------|----------|-------------|
| `transfer` | ERC-20, ERC-1400 | Standard token transfer |
| `mint` | ERC-20, ERC-1400 | Token creation (from 0x0 address) |
| `burn` | ERC-20, ERC-1400 | Token destruction (to 0x0 address) |
| `partition_mint` | ERC-1400 only | Security token issued to partition |
| `partition_transfer` | ERC-1400 only | Transfer within/across partitions |
| `partition_burn` | ERC-1400 only | Partition-based redemption |

## erc_nft_transfer

Stores transfer history for ERC-721 NFTs.

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `token_id` | bigint | Hedera contract ID for the NFT collection |
| `serial_number` | numeric | NFT tokenId within the collection |
| `consensus_timestamp` | bigint | Transfer time (nanoseconds since epoch) |
| `log_index` | integer | Event index within transaction |
| `token_evm_address` | text | EVM address of NFT contract |
| `transaction_hash` | text | Transaction hash |
| `payer_account_id` | bigint | Hedera account ID of transaction payer |
| `payer_evm_address` | text | EVM address of payer |
| `transfer_type` | varchar | Type: `transfer`, `mint`, `burn` |
| `sender_account_id` | bigint | Sender's Hedera account ID (NULL for mints) |
| `sender_evm_address` | text | Sender's EVM address |
| `receiver_account_id` | bigint | Receiver's Hedera account ID (NULL for burns) |
| `receiver_evm_address` | text | Receiver's EVM address |

## Data Types and Constraints

### Numeric Types

- **BIGINT**: Used for Hedera IDs, timestamps, and counts
- **NUMERIC**: Used for balances and supplies (handles uint256 values up to 2^256-1)
- **DECIMAL(3,2)**: Used for reliability scores (0.00 to 1.00)

### Timestamp Formats

All timestamps use nanoseconds since epoch (Hedera format):

- **created_timestamp**: Contract/entity creation time
- **balance_timestamp**: Last balance update time
- **processing_timestamp**: When the record was processed/synced
- **transfers_indexed_timestamp**: Last indexed transfer time
- **consensus_timestamp**: Transaction consensus time (transfer tables)

### Contract Types

Valid values for `contract_type` field:

- `ERC_20`: Standard ERC-20 fungible token
- `ERC_721`: Standard ERC-721 NFT collection
- `ERC_1400`: ERC-1400 security token
- `UNKNOWN`: Contract type could not be determined
- `FAILED_DEPLOYMENT`: Contract deployment failed

## Relationships

The tables are related as follows:

```text
erc_token (1) ─────────────┬──── (*) erc_token_account
                           │
                           ├──── (*) erc_nft
                           │
                           ├──── (*) erc_token_transfer
                           │
                           └──── (*) erc_nft_transfer
```

- One token can have many account balances
- One token can have many NFTs (for ERC-721 tokens)
- One token can have many transfers (fungible or NFT)
- Account balances reference tokens via `token_id`
- NFTs reference their collection via `token_id`
- Transfer history references tokens via `token_id`
- NFT transfers also reference specific NFTs via `serial_number`

## Query Examples

### Get token with its holders

```graphql
# Step 1: Get token metadata
query GetToken($tokenId: bigint!) {
  erc_token_by_pk(token_id: $tokenId) {
    token_id
    name
    symbol
    contract_type
  }
}

# Step 2: Get holders for that token (separate query)
query GetTokenHolders($tokenId: bigint!) {
  erc_token_account(
    where: {
      token_id: { _eq: $tokenId }
      balance: { _gt: "0" }
    }
    order_by: { balance: desc }
    limit: 100
  ) {
    account_id
    balance
    balance_timestamp
  }
}
```

### Get NFT collection with individual NFTs

```graphql
# Step 1: Get NFT collection metadata
query GetNFTCollection($tokenId: bigint!) {
  erc_token_by_pk(token_id: $tokenId) {
    token_id
    name
    symbol
    total_supply
  }
}

# Step 2: Get NFTs in the collection (separate query)
query GetNFTsInCollection($tokenId: bigint!) {
  erc_nft(
    where: {
      token_id: { _eq: $tokenId }
      deleted: { _eq: false }
    }
    order_by: { serial_number: asc }
    limit: 100
  ) {
    serial_number
    account_id
    metadata
    created_timestamp
  }
}
```

:::note
The ERC schema uses separate tables without nested GraphQL relationships. Query the token first, then use its `token_id` to fetch related holders or NFTs.
:::

For more comprehensive query examples, see the [Query Examples](./queries) page.
