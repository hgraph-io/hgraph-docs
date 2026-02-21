---
sidebar_position: 4
title: Top HTS Native NFTs
---

# Top HTS Native NFT Collections

## Overview
The Top HTS NFT Collections statistic ranks the most active and valuable **Hedera Token Service (HTS) native** NFT collections on the Hedera network. This metric uses a composite scoring algorithm that balances financial activity (trading volume) with community engagement (transaction frequency) to identify the most significant native NFT collections in the ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`top_non_fungible_tokens_hts`**

## What are HTS NFTs?

**Hedera Token Service (HTS)** is Hedera's native token service for creating and managing both fungible and non-fungible tokens. HTS NFTs with type `NON_FUNGIBLE_UNIQUE` represent unique, indivisible tokens created directly on Hedera without requiring a smart contract. Each NFT is identified by a unique token ID in Hedera's format (0.0.X).

## Methodology

### Composite Scoring Algorithm

The ranking algorithm evaluates each HTS NFT collection using a **weighted composite score** that combines two key metrics:

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
| `public.token` | HTS token metadata (type = 'NON_FUNGIBLE_UNIQUE') |
| `transaction` | NFT transfer events (nft_transfer JSONB field) |
| `crypto_transfer` | HBAR payment amounts linked to transfers |

## Function Signature

```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_hts(
    window_hours INTEGER DEFAULT 72,
    result_limit INTEGER DEFAULT 50,
    exclusion_threshold NUMERIC DEFAULT 1.0
);
```

### Return Type

| Field | Type | Description |
|-------|------|-------------|
| `rank` | INTEGER | Position in ranking (1 = highest score) |
| `token_id` | BIGINT | Hedera HTS token ID (0.0.X format) |
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

### Fetch top 10 HTS NFT collections (last 72 hours)

```graphql
query TopHTSNFTCollections {
  top_nft_collections_hts: ecosystem_top_non_fungible_tokens_hts(
    args: {window_hours: 72, result_limit: 10, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    sales_volume_hbar
    transaction_count
    composite_score
  }
}
```

### Fetch top collections with concentration filter (organic communities)

```graphql
query OrganicHTSCollections {
  top_nft_collections_hts: ecosystem_top_non_fungible_tokens_hts(
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

### Compare 24-hour vs 7-day HTS trends

```graphql
query CompareHTSTrends {
  last_24h: ecosystem_top_non_fungible_tokens_hts(
    args: {window_hours: 24, result_limit: 20, exclusion_threshold: 1.0}
  ) {
    rank
    collection_name
    sales_volume_hbar
  }
  last_7days: ecosystem_top_non_fungible_tokens_hts(
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
query HTSScoreComponentBreakdown {
  hts_collections: ecosystem_top_non_fungible_tokens_hts(
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

## Sample Output (Mainnet - 72-hour window)

```
 rank |  token_id  |       collection_name        | sales_volume_hbar | transaction_count | composite_score 
------+------------+------------------------------+-------------------+-------------------+-----------------
    1 |     728613 | Dead Pixels Ghost Club       |          24727.40 |              1273 |          1.0000
    2 |     731861 | Degen Street Bets            |           8953.79 |               623 |          0.5274
    3 |     540588 | Shillers Avatars By Whales   |           7291.18 |               421 |          0.4187
    4 |     902600 | Lazy Apepes                  |           5612.34 |               389 |          0.3522
    5 |     567821 | Earthlings.                  |           4823.91 |               356 |          0.3089
```

## Usage Examples

### Recommended Default (Top 50, 72-hour window)
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_hts(72, 50, 1.0);
```

### Alternative Time Windows

**Last 24 Hours (Real-time Trends)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_hts(24, 50, 1.0);
```

**Last 7 Days (Weekly Trends)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_hts(168, 50, 1.0);
```

**Last 30 Days (Monthly Performance)**
```sql
SELECT * FROM ecosystem.top_non_fungible_tokens_hts(720, 50, 1.0);
```

### Enable Concentration Filter (Organic Communities Only)

Exclude collections where the top 5 accounts contribute >80% of transactions:

```sql
SELECT 
    rank, 
    collection_name, 
    sales_volume_hbar,
    concentration_ratio
FROM ecosystem.top_non_fungible_tokens_hts(72, 50, 0.8)
WHERE concentration_ratio <= 0.8
ORDER BY rank;
```

## Comparison with ERC-721 NFTs

| Aspect | HTS Native | ERC-721 |
|--------|-----------|---------|
| **Standard** | Hedera Token Service | Smart contract interface |
| **Created Via** | HTS tokens (native) | Solidity contracts |
| **Data Schema** | `public.token` table | `erc` schema |
| **Token ID Format** | 0.0.X (Hedera format) | EVM address (0x...) |
| **Flexibility** | Standard HTS features | High (custom logic) |
| **Use Cases** | Native Hedera NFTs | Complex NFTs, DeFi integration |

## Important Notes

- Multi-NFT transactions are handled by proportionally dividing HBAR amounts by NFT count
- Zero volume collections are included in rankings (scored by transaction count alone)
- Treasury account transactions are excluded from volume calculations
- Ranking is deterministic: secondary sorting by transaction count, then sales volume
- Normalization is recalculated independently for each query (not cached)
- All timestamps use nanosecond precision (Hedera timestamp9 format)

## SQL Implementation

The SQL function `ecosystem.top_non_fungible_tokens_hts()` is implemented with:
- Min-max normalization for fair value comparison
- CTE-based query composition for readability and maintainability
- PLPGSQL for parameterized execution
- Concentration filter via window functions
- JSONB array parsing of `nft_transfer` field via `jsonb_array_elements()`
- Multi-NFT transaction HBAR splitting (`hbar_tinybar / nft_count`)

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Related Metrics

- [Top ERC-721 NFT Collections](/hedera-stats/non-fungible-tokens/top-erc-nfts) - Smart contract NFTs
- [NFT Collection Sales Volume](/hedera-stats/non-fungible-tokens/nft-collection-sales-volume) - Period sales volume
- [NFT Collection Sales Volume (Total)](/hedera-stats/non-fungible-tokens/nft-collection-sales-volume-total) - Cumulative sales

## Dependencies
* Hedera mirror node
* `public.token` table (HTS tokens with type = 'NON_FUNGIBLE_UNIQUE')
* `transaction` table with nft_transfer JSONB field
* `crypto_transfer` table for HBAR values
