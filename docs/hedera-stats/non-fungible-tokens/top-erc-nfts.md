---
sidebar_position: 5
title: Top ERC-721 Smart Contract NFTs
---

# Top ERC-721 Smart Contract NFT Collections

## Overview
The Top ERC-721 NFT Collections statistic ranks the most active and valuable **ERC-721 smart contract** NFT collections on the Hedera network. This metric uses a composite scoring algorithm that balances financial activity (trading volume) with community engagement (transaction frequency) to identify the most significant collections in the ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`top_non_fungible_tokens_erc`**

## What are ERC-721 Collections?

**ERC-721 (Ethereum Request for Comment)** is the standard smart contract interface for non-fungible tokens on the Hedera network. ERC-721 collections are **smart contracts deployed via Solidity** that manage NFTs with unique identifiers. Each NFT in an ERC-721 collection is a distinct token with its own metadata and ownership.

## Methodology

### Composite Scoring Algorithm

The ranking algorithm evaluates each ERC-721 collection using a **weighted composite score** that combines two key metrics:

```
Composite Score = (Normalized Sales Volume × 0.60) + (Normalized Transaction Count × 0.40)
```

### Scoring Components

| Component | Weight | Metric | Definition |
|-----------|--------|--------|------------|
| **Sales Volume** | 60% | HBAR traded | Total HBAR value exchanged within the collection during the evaluation period |
| **Transaction Activity** | 40% | Transaction count | Number of unique transactions involving the collection |

### Min-Max Normalization

Both metrics are normalized to a [0, 1] range to enable fair comparison:

```
normalized_value = (value - min_value) / (max_value - min_value)
```

This ensures that collections with vastly different scales are compared fairly.

### Weighting Rationale

- **60% Sales Volume**: Financial activity indicates real economic value, market demand, and liquidity
- **40% Transaction Activity**: High transaction count shows community engagement and active adoption

### Time Window

By default, rankings are calculated over a **72-hour rolling window** (configurable to 24h, 168h, 720h). This window balances capturing recent trends while avoiding short-term volatility.

## Concentration Filter (Optional)

To identify organic community collections vs. whale-dominated ones, an optional **concentration filter** identifies the proportion of transactions from the top 5 most active accounts:

```
Concentration Ratio = Top 5 Account Transactions / Total Transactions
```

The result is a ratio between **0 and 1** (e.g., 0.8 = 80% of transactions from top 5 accounts).

**Usage**: Set `exclusion_threshold < 1.0` to filter out collections where concentration exceeds the threshold (e.g., 0.8 = exclude if top 5 accounts contribute >80% of transactions).

## Data Sources

| Source | Usage |
|--------|-------|
| `erc.token` | ERC-721 smart contract metadata (contract_type = 'ERC_721') |
| `erc.nft_transfer` | Transfer events (Transfer, Mint, Burn) |
| `crypto_transfer` | HBAR payment amounts linked to transfers |

## Function Signature

```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_erc(
    window_hours INTEGER DEFAULT 72,
    result_limit INTEGER DEFAULT 50,
    exclusion_threshold NUMERIC DEFAULT 1.0
);
```

### Return Type

| Field | Type | Description |
|-------|------|-------------|
| `rank` | INTEGER | Position in ranking (1 = highest score) |
| `token_id` | BIGINT | Hedera token ID of the ERC-721 contract |
| `token_evm_address` | TEXT | EVM address of the smart contract (0x...) |
| `collection_name` | TEXT | Name of the NFT collection |
| `sales_volume_hbar` | NUMERIC | Total HBAR trading volume in period |
| `transaction_count` | BIGINT | Number of transactions in period |
| `unique_accounts` | BIGINT | Count of distinct accounts trading |
| `normalized_volume` | NUMERIC | Volume metric normalized to [0,1] |
| `normalized_transactions` | NUMERIC | Transaction count normalized to [0,1] |
| `composite_score` | NUMERIC | Final weighted score (0-1) |
| `volume_contribution` | NUMERIC | Volume component (normalized_volume × 0.6) |
| `tx_contribution` | NUMERIC | Transaction component (normalized_tx × 0.4) |
| `concentration_ratio` | NUMERIC | % of transactions from top 5 accounts |

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch top 10 ERC-721 collections (last 72 hours)

```graphql
query TopERC721Collections {
  top_nft_collections_erc: ecosystem_top_non_fungible_tokens_erc(
    args: {window_hours: 72, result_limit: 10, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    token_evm_address
    sales_volume_hbar
    transaction_count
    composite_score
  }
}
```

### Fetch top collections with concentration filter (organic communities)

```graphql
query OrganicERC721Collections {
  top_nft_collections_erc: ecosystem_top_non_fungible_tokens_erc(
    args: {window_hours: 72, result_limit: 50, exclusion_threshold: 0.8}
  ) {
    rank
    collection_name
    sales_volume_hbar
    transaction_count
    concentration_ratio
    composite_score
  }
}
```

### Compare 24-hour vs 7-day trends

```graphql
query CompareERC721Trends {
  last_24h: ecosystem_top_non_fungible_tokens_erc(
    args: {window_hours: 24, result_limit: 20, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    sales_volume_hbar
  }
  last_7days: ecosystem_top_non_fungible_tokens_erc(
    args: {window_hours: 168, result_limit: 20, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    sales_volume_hbar
  }
}
```

### Analyze normalized score components

```graphql
query ScoreComponentBreakdown {
  erc721_collections: ecosystem_top_non_fungible_tokens_erc(
    args: {window_hours: 72, result_limit: 25, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    normalized_volume
    normalized_transactions
    volume_contribution
    tx_contribution
    composite_score
  }
}
```

## Sample Output (Testnet - 72-hour window)

```
 rank | collection_name | sales_volume_hbar | transaction_count | composite_score 
------+-----------------+-------------------+-------------------+-----------------
    1 | MedicineRiskUnit|            202.15 |                10 |          1.0000
    2 | TestNFT         |              0.44 |                 8 |          0.3118
    3 | TestNFT         |              0.44 |                 8 |          0.3118
    4 | TestNFT         |              0.44 |                 8 |          0.3118
    5 | TestNFT         |              0.44 |                 8 |          0.3118
```

## Usage Examples

### Recommended Default (Top 50, 72-hour window)
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_erc(72, 50, 1.0);
```

### Alternative Time Windows

**Last 24 Hours (Real-time Trends)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_erc(24, 50, 1.0);
```

**Last 7 Days (Weekly Trends)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_erc(168, 50, 1.0);
```

**Last 30 Days (Monthly Performance)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_erc(720, 50, 1.0);
```

### Enable Concentration Filter (Organic Communities Only)

Exclude collections where the top 5 accounts contribute >80% of transactions:

```sql
SELECT 
    rank, 
    collection_name, 
    sales_volume_hbar,
    concentration_ratio
FROM ecosystem.top_non_fungible_tokens_erc(72, 50, 0.8)
WHERE concentration_ratio <= 0.8
ORDER BY rank;
```

## Comparison with HTS NFTs

| Aspect | ERC-721 | HTS Native |
|--------|---------|-----------|
| **Standard** | Smart contract interface | Hedera Token Service |
| **Created Via** | Solidity contracts | HTS tokens (NON_FUNGIBLE_UNIQUE) |
| **Data Schema** | `erc` schema | `public.token` table |
| **Contract Address** | EVM address (0x...) | Not applicable |
| **Flexibility** | High (custom logic) | Standard HTS features |
| **Use Cases** | Complex NFTs, DeFi integration | Native Hedera NFTs |

## Important Notes

- Sender account transfers are excluded from sales volume calculations (only positive inflows to recipients counted)
- Zero volume collections are included in rankings (scored by transaction count alone)
- Ranking is deterministic: secondary sorting by transaction count, then sales volume
- Normalization is recalculated independently for each query (not cached)
- All timestamps use nanosecond precision (Hedera timestamp9 format)

## SQL Implementation

The SQL function `ecosystem.top_non_fungible_tokens_erc()` is implemented with:
- Min-max normalization for fair value comparison
- CTE-based query composition for readability and maintainability
- PLPGSQL for parameterized execution
- Concentration filter via window functions

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Related Metrics

- [Top HTS NFT Collections](/hedera-stats/non-fungible-tokens/top-hts-nfts) - Native Hedera NFTs
- [NFT Collection Sales Volume](/hedera-stats/non-fungible-tokens/nft-collection-sales-volume) - Period sales volume
- [NFT Collection Sales Volume (Total)](/hedera-stats/non-fungible-tokens/nft-collection-sales-volume-total) - Cumulative sales

## Dependencies
* Hedera mirror node
* `erc.token` table with ERC-721 contract metadata
* `erc.nft_transfer` table with transfer events
* `crypto_transfer` table for HBAR values
