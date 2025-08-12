---
sidebar_position: 23
title: NFT Collection Volume
---

# NFT Collection Sales Volume

This metric tracks the gross HBAR paid (in tinybars) for specified NFT collections over defined time periods. It measures positive HBAR value moved in transactions that transfer NFTs, excludes treasury self‑payments, and proportionally allocates per‑transaction HBAR across all NFTs moved so bundle sales are handled correctly.

By breaking down sales by collection and period, it highlights market activity on Hedera—e.g., spikes during drops or steady growth over weeks.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`ecosystem_nft_collection_sales_volume`**

> **Note:** The GraphQL query calls a real-time SQL function.

## Methodology

### Data Sourcing and Filtering

- Sources:
  - `public.transaction` (reads `nft_transfer` JSON for NFT movements, plus `type` and `result`)
  - `public.crypto_transfer` (HBAR legs)
  - `public.token` (collection names and `treasury_account_id`)
- Eligibility filters (transaction‑level):

  - **Has NFT transfers** (`transaction.nft_transfer` not null)
  - **Succeeded** (`transaction.result = 22`)
  - **Not mint** (`transaction.type <> 37`, i.e., `tokenMint`)
  - **At least one positive HBAR leg** at the same `consensus_timestamp`

- **Treasury exclusion:** Positive HBAR paid **to any treasury account** of tokens moved in the transaction is **excluded** from the HBAR pot used for sales volume.

### Time Period Generation

- Anchor the current bucket with `date_trunc(period, CURRENT_TIMESTAMP)`.
- Build a backfilled sequence of buckets with `generate_series`, stepping by `'1 ' || period`.
- This yields a complete grid (collection × bucket), even when no sales occurred (these rows show `total = 0`).

### Allocation & Aggregation

- For each eligible transaction:
  1. Count **total NFTs moved** (across all collections) at that `consensus_timestamp`.
  2. Count **NFTs moved per requested collection** at that timestamp.
  3. Compute **positive HBAR sum** from `crypto_transfer` **excluding treasury recipients** for that transaction.
  4. **Allocate proportionally:**
     `allocated_hbar = (pos_hbar_ex_treasury * collection_nfts) / total_nfts`
- Periodized function: bucket the allocated result by `date_trunc(period, to_timestamp(consensus_timestamp/1e9))`.
- Total function: sum the allocated result across the requested time window.

### Final Output Construction

- Produce the dense grid (requested `token_id`s × generated periods).
- Left‑join allocated totals and `COALESCE` to `0` when no sales for that slot.
- Join `public.token` for `collection_name`.
- Order by period descending, then `total` descending.

## Semantics & Caveats

- **What’s included:** Gross buyer HBAR spend attributed to collections, **including** royalties/marketplace payments present in `crypto_transfer`.
- **What’s excluded:** Positive HBAR sent to **treasury accounts** of tokens moved in the same transaction.
- **Not counted:** Sales paid entirely in **fungible tokens (HTS)**—only HBAR legs are included.
- **Bucket edges:** Buckets are anchored by `date_trunc(period, CURRENT_TIMESTAMP)`; `nft_period` timestamps are UTC.

## GraphQL API Example

Try this in the [developer playground](https://dashboard.hgraph.com).

```graphql
# Fetch weekly sales volume for 5 NFT collections for the last 52 weeks.
query NFTCollectionSalesVolume {
  ecosystem_nft_collection_sales_volume(
    args: { row_limit: 52, period: "week", token_ids: "{878200,1350444,2179656,6178143,8302178}" }
    order_by: { nft_period: desc_nulls_last }
  ) {
    token_id
    collection_name
    nft_period
    total
  }
}
```

## Supported Arguments

- `token_ids` — array of NFT collection IDs.
- `period` — one of: `hour`, `day`, `week`, `month`, `quarter`, `year`.
- `row_limit` — number of periods to return per collection.

## SQL Implementation

The **Hedera Stats** repository contains the SQL function that powers this metric.

SQL Function: `ecosystem.nft_collection_sales_volume`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
