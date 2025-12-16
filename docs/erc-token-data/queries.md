---
sidebar_position: 2
title: Query Examples
---

# Query Examples

This page provides a comprehensive collection of GraphQL queries for accessing ERC token data.

## Prerequisites

### API Endpoints

- **Testnet**: `https://testnet.hedera.api.hgraph.io/v1/graphql`
- **Mainnet**: `https://mainnet.hedera.api.hgraph.io/v1/graphql`

### Authentication

All queries require an API key. See the [authentication documentation](/hgraph-sdk/endpoints-authorization) for setup instructions.

### Example Request

```javascript
const response = await fetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
    'x-api-key': '<YOUR_API_KEY>',
  },
  body: JSON.stringify({
    query: `your GraphQL query here`
  })
})
```

## Basic Queries

### 1. Get All ERC-20 Tokens

```graphql
query GetERC20Tokens {
  erc_token(
    where: { contract_type: { _eq: "ERC_20" } }
    order_by: { total_supply: desc_nulls_last }
    limit: 10
  ) {
    token_id
    name
    symbol
    decimals
    total_supply
    token_evm_address
    created_timestamp
    metadata_reliability_score
  }
}
```

### 2. Get All ERC-721 NFT Collections

```graphql
query GetNFTCollections {
  erc_token(
    where: { contract_type: { _eq: "ERC_721" } }
    order_by: { created_timestamp: desc }
    limit: 10
  ) {
    token_id
    name
    symbol
    token_evm_address
    created_timestamp
    metadata_reliability_score
  }
}
```

### 3. Search Tokens by Name or Symbol

```graphql
query SearchTokens($searchTerm: String!) {
  erc_token(
    where: {
      _or: [
        { name: { _ilike: $searchTerm } }
        { symbol: { _ilike: $searchTerm } }
      ]
    }
  ) {
    token_id
    name
    symbol
    contract_type
    decimals
    token_evm_address
    metadata_reliability_score
  }
}

# Variables:
# { "searchTerm": "%USDC%" }
```

### 4. Get Token Holders

```graphql
query GetTokenHolders($tokenId: bigint!) {
  erc_token_account(
    where: { token_id: { _eq: $tokenId } }
    order_by: { balance: desc }
    limit: 20
  ) {
    account_id
    balance
    balance_timestamp
    created_timestamp
  }
}

# Variables:
# { "tokenId": 7308509 }
```

### 5. Get Account Portfolio

```graphql
query GetAccountPortfolio($accountId: bigint!) {
  erc_token_account(
    where: { account_id: { _eq: $accountId } }
    order_by: { balance: desc }
  ) {
    token_id
    balance
    balance_timestamp
    created_timestamp
  }
}

# Variables:
# { "accountId": 924713 }
#
# Note: To get token details, make a separate query with the token_ids from above:
# query GetTokenDetails($tokenIds: [bigint!]) {
#   erc_token(where: { token_id: { _in: $tokenIds } }) {
#     token_id
#     name
#     symbol
#     contract_type
#     decimals
#     token_evm_address
#   }
# }
```

## Advanced Queries

### 6. Get Individual NFTs in a Collection

```graphql
query GetNFTsInCollection($tokenId: bigint!, $limit: Int = 50, $offset: Int = 0) {
  erc_nft(
    where: {
      token_id: { _eq: $tokenId }
      deleted: { _eq: false }
    }
    limit: $limit
    offset: $offset
    order_by: { serial_number: asc }
  ) {
    serial_number
    account_id
    metadata
    created_timestamp
  }

  # Get total count for pagination
  erc_nft_aggregate(
    where: {
      token_id: { _eq: $tokenId }
      deleted: { _eq: false }
    }
  ) {
    aggregate {
      count
    }
  }
}

# Variables:
# { "tokenId": 7308509, "limit": 50, "offset": 0 }
```

### 7. Get NFTs Owned by an Account

```graphql
query GetAccountNFTs($accountId: bigint!) {
  # Get individual NFTs
  nfts: erc_nft(
    where: {
      account_id: { _eq: $accountId }
      deleted: { _eq: false }
    }
    order_by: { token_id: asc, serial_number: asc }
  ) {
    token_id
    serial_number
    metadata
    created_timestamp
  }

  # Get total count of NFTs owned
  nft_count: erc_nft_aggregate(
    where: {
      account_id: { _eq: $accountId }
      deleted: { _eq: false }
    }
  ) {
    aggregate {
      count
    }
  }
}

# Variables:
# { "accountId": 924713 }
```

### 8. Platform Statistics

```graphql
query PlatformStatistics {
  erc20_count: erc_token_aggregate(where: {contract_type: {_eq: "ERC_20"}}) {
    aggregate {
      count
    }
  }
  erc721_count: erc_token_aggregate(where: {contract_type: {_eq: "ERC_721"}}) {
    aggregate {
      count
    }
  }
  erc1400_count: erc_token_aggregate(where: {contract_type: {_eq: "ERC_1400"}}) {
    aggregate {
      count
    }
  }
  largest_tokens: erc_token(
    where: {contract_type: {_in: ["ERC_20", "ERC_721", "ERC_1400"]}}
    order_by: {total_supply: desc_nulls_last}
    limit: 5
  ) {
    token_id
    name
    symbol
    contract_type
    total_supply
    token_evm_address
  }
  newest_tokens: erc_token(
    where: {contract_type: {_in: ["ERC_20", "ERC_721", "ERC_1400"]}}
    order_by: {created_timestamp: desc_nulls_last}
    limit: 5
  ) {
    token_id
    name
    symbol
    contract_type
    created_timestamp
    token_evm_address
  }
  total_holders: erc_token_account_aggregate {
    aggregate {
      count(distinct: true, columns: account_id)
    }
  }
}
```

> **Note:** For transfer activity metrics, aggregate from the `erc_token_transfer` table:
>
> ```graphql
> {
>   erc_token_transfer_aggregate(where: {token_id: {_eq: $tokenId}}) {
>     aggregate { count }
>   }
> }
> ```

### 9. High-Quality Tokens Only

```graphql
query ReliableTokens($minScore: numeric = 0.75) {
  erc_token(
    where: {
      metadata_reliability_score: { _gte: $minScore }
      contract_type: { _in: ["ERC_20", "ERC_721"] }
    }
    order_by: {
      metadata_reliability_score: desc,
      created_timestamp: desc
    }
  ) {
    token_id
    name
    symbol
    contract_type
    metadata_reliability_score
    token_evm_address
  }
}

# Variables:
# { "minScore": 0.5 }
```

### 10. Token Deep Dive

```graphql
query TokenDeepDive($tokenId: bigint!) {
  # Token details
  token: erc_token_by_pk(token_id: $tokenId) {
    token_id
    token_evm_address
    contract_type
    name
    symbol
    decimals
    total_supply
    metadata_reliability_score
    created_timestamp
    processing_timestamp
    transfers_indexed_timestamp  # Last indexed transfer time
  }

  # Holder statistics
  holder_stats: erc_token_account_aggregate(
    where: { token_id: { _eq: $tokenId } }
  ) {
    aggregate {
      count
      sum {
        balance
      }
      avg {
        balance
      }
      max {
        balance
      }
    }
  }

  # Top 10 holders
  top_holders: erc_token_account(
    where: { token_id: { _eq: $tokenId } }
    order_by: { balance: desc }
    limit: 10
  ) {
    account_id
    balance
    balance_timestamp
  }

  # Recent holders
  recent_holders: erc_token_account(
    where: { token_id: { _eq: $tokenId } }
    order_by: { created_timestamp: desc }
    limit: 5
  ) {
    account_id
    balance
    created_timestamp
  }
}

# Variables:
# { "tokenId": 7308509 }
```

### 11. Get Token by EVM Address

```graphql
query GetTokenByAddress($evmAddress: String!) {
  erc_token(where: { token_evm_address: { _eq: $evmAddress } }) {
    token_id
    name
    symbol
    contract_type
    decimals
    total_supply
  }
}

# Variables:
# { "evmAddress": "0x6e96a607f2f5657b39bf58293d1a006f9415af32" }
```

### 12. Get Token Transfer History

```graphql
query GetTokenTransfers($tokenId: bigint!, $limit: Int = 20) {
  erc_token_transfer(
    where: { token_id: { _eq: $tokenId } }
    order_by: { consensus_timestamp: desc }
    limit: $limit
  ) {
    consensus_timestamp
    sender_account_id
    receiver_account_id
    amount
    transfer_type
    transaction_hash
  }
}

# Variables:
# { "tokenId": 7308509, "limit": 20 }
```

### 13. Get Account Transfer History

```graphql
query GetAccountTransfers($accountId: bigint!) {
  erc_token_transfer(
    where: {
      _or: [
        { sender_account_id: { _eq: $accountId } }
        { receiver_account_id: { _eq: $accountId } }
      ]
    }
    order_by: { consensus_timestamp: desc }
    limit: 20
  ) {
    token_id
    sender_account_id
    receiver_account_id
    amount
    transfer_type
    consensus_timestamp
  }
}

# Variables:
# { "accountId": 924713 }
```

### 14. Get ERC-1400 Security Tokens

```graphql
query GetSecurityTokens {
  erc_token(
    where: { contract_type: { _eq: "ERC_1400" } }
    order_by: { created_timestamp: desc_nulls_last }
    limit: 10
  ) {
    token_id
    name
    symbol
    decimals
    total_supply
    token_evm_address
    metadata_reliability_score
  }
}
```

> **Note:** ERC-1400 tokens also work with transfer history queries (12-13). The `erc_token_transfer` table includes a `partition_id` field for partition-aware transfers.

### 15. Get NFT Transfer History

```graphql
query GetNFTTransfers($tokenId: bigint!, $limit: Int = 20) {
  erc_nft_transfer(
    where: { token_id: { _eq: $tokenId } }
    order_by: { consensus_timestamp: desc }
    limit: $limit
  ) {
    serial_number
    consensus_timestamp
    sender_account_id
    receiver_account_id
    transfer_type
    transaction_hash
  }
}

# Variables:
# { "tokenId": 9799174, "limit": 20 }
```

## Real-World Use Cases

### DeFi Portfolio Tracker

Track all DeFi positions for an account:

```graphql
query DeFiPortfolio($accountId: bigint!) {
  # ERC-20 holdings with balances
  erc20_holdings: erc_token_account(
    where: {
      account_id: { _eq: $accountId }
      balance: { _gt: "0" }
    }
  ) {
    token_id
    balance
    balance_timestamp
  }

  # Portfolio summary
  portfolio_summary: erc_token_account_aggregate(
    where: {
      account_id: { _eq: $accountId }
      balance: { _gt: "0" }
    }
  ) {
    aggregate {
      count
    }
  }
}

# Variables:
# { "accountId": 924713 }
```

### NFT Collection Analytics

Analyze an NFT collection's distribution:

```graphql
query NFTCollectionAnalytics($tokenId: bigint!) {
  collection: erc_token_by_pk(token_id: $tokenId) {
    name
    symbol
    total_supply
  }

  # Holder distribution
  holder_distribution: erc_token_account_aggregate(
    where: { token_id: { _eq: $tokenId } }
  ) {
    aggregate {
      count  # unique holders
      avg {
        balance  # average NFTs per holder
      }
      max {
        balance  # largest holder
      }
    }
  }

  # Top collectors
  top_collectors: erc_token_account(
    where: { token_id: { _eq: $tokenId } }
    order_by: { balance: desc }
    limit: 10
  ) {
    account_id
    balance
  }

  # Total NFTs (minted minus burned)
  total_nfts: erc_nft_aggregate(
    where: {
      token_id: { _eq: $tokenId }
      deleted: { _eq: false }
    }
  ) {
    aggregate {
      count
    }
  }

  # Burned NFTs count
  burned_nfts: erc_nft_aggregate(
    where: {
      token_id: { _eq: $tokenId }
      deleted: { _eq: true }
    }
  ) {
    aggregate {
      count
    }
  }
}

# Variables:
# { "tokenId": 9799174 }
```

### Token Discovery

Find new tokens launched in the last 24 hours:

```graphql
query NewTokens($hoursAgo: Int = 24) {
  erc_token(
    where: {
      # Calculate timestamp for N hours ago
      # Assuming current time - (hours * 3600 * 1e9) nanoseconds
      created_timestamp: { _gte: "1234567890000000000" }
      contract_type: { _in: ["ERC_20", "ERC_721"] }
    }
    order_by: { created_timestamp: desc }
  ) {
    token_id
    name
    symbol
    contract_type
    token_evm_address
    created_timestamp
    metadata_reliability_score
  }
}
```

### Whale Wallet Monitoring

Monitor large holders across multiple tokens:

```graphql
query WhaleActivity($minBalance: numeric = "1000000000000000000") {
  # Find whale positions
  whale_positions: erc_token_account(
    where: {
      balance: { _gte: $minBalance }
    }
    order_by: { balance: desc }
    limit: 50
  ) {
    account_id
    token_id
    balance
    balance_timestamp
  }

  # Aggregate whale statistics
  whale_stats: erc_token_account_aggregate(
    where: {
      balance: { _gte: $minBalance }
    }
  ) {
    aggregate {
      count
      sum {
        balance
      }
    }
  }
}
```

### Cross-Token Account Analysis

Analyze an account's activity across all tokens:

```graphql
query AccountCrossTokenAnalysis($accountId: bigint!) {
  # Get all token balances for the account
  account_tokens: erc_token_account(
    where: { account_id: { _eq: $accountId } }
  ) {
    token_id
    balance
    created_timestamp
  }

  # First and latest activities
  activity_timeline: erc_token_account_aggregate(
    where: { account_id: { _eq: $accountId } }
  ) {
    aggregate {
      min {
        created_timestamp
      }
      max {
        balance_timestamp
      }
    }
  }
}

# Variables:
# { "accountId": 924713 }
```
