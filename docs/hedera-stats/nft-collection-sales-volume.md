---
sidebar_position: 23
title: NFT Collection Volume
---

# NFT Collection Sales Volume

This metric tracks the total sales volume in tinybars (the smallest unit of HBAR cryptocurrency) for specified NFT collections over defined time periods. It measures the sum of cryptocurrency transfers associated with NFT sales, excluding certain transaction types, to show how much value has been exchanged for NFTs in those collections.

By breaking down sales by collection and period, it helps users understand trends in NFT market activity on the Hedera network, such as spikes in trading volume during popular events or steady growth over months.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`ecosystem_nft_collection_sales_volume`**

> **Note**: The GraphQL query structure for this statistic will be different, as it calls a real-time function.

## Methodology

### Data Sourcing and Filtering

- Data is sourced from Hedera mirror node tables: `public.nft_transfer` (for NFT movements), `public.transaction` (for transaction details), `public.crypto_transfer` (for HBAR amounts), and `public.token` (for collection names).
- Filters include: NFT transfers where `token_id` matches the provided array of collection IDs, consensus timestamps from the calculated minimum onward (to cover the requested periods), transactions excluding type 37 (which are scheduled transactions), and crypto transfers with positive amounts (indicating payments).
- This ensures only relevant sales—where NFTs are transferred and HBAR is paid—are included, like focusing on actual purchases in a marketplace.

### Time Period Generation

- The current period is truncated to the specified granularity (e.g., 'day' rounds to midnight).
- A start period is calculated by subtracting (row_limit - 1) intervals from the current period, creating a range of historical slots.
- Periods are generated using `generate_series` to create a sequence from start to current, stepping by one interval (e.g., every day).
- This forms a backbone of time slots, like marking calendar days for a report, ensuring consistent coverage even if no sales occurred.

### Aggregation and Computation

- Sales data is aggregated by joining NFT transfers with transactions and crypto transfers on consensus timestamps.
- For each matching record, HBAR amounts are summed per token_id and truncated period.
- This computes the total sales volume as the sum of positive crypto transfers linked to NFT transfers, representing the economic value of sales.

### Final Output Construction

- All combinations of token_ids and periods are created via cross join, ensuring every collection has an entry for every period.
- Left join adds the computed sales totals, defaulting to 0 with COALESCE if no sales occurred—like filling in zeros for quiet days.
- Results are joined with token table for collection names and ordered by period descending, then total descending, presenting a time series per collection with recent data first and highest volumes prioritized.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch NFT Collection Sales Volume for a Period

```graphql
# Fetch weekly sales volume for 5 NFT collections for the last 52 weeks.
query NFTCollectionSalesVolume {
  ecosystem_nft_collection_sales_volume(
    args: {row_limit: 52, period: "week", token_ids: "{878200, 1350444, 2179656, 6178143, 8302178}"}
    order_by: {nft_period: desc_nulls_last}
  ) {
    total
    collection_name
    nft_period
    token_id
  }
}
```

## Supported Arguments

- `row_limit` - limits the number of periods returned for each collection (eg: 10 rows for 10 collections will return 100 rows).
- `period` - can be hour, day, week, month, quarter, year
- `token_ids` - an array of collection IDs

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **NFT Collection Sales Volume** statistic outlined in this methodology.

SQL Function: `ecosystem.nft_collection_sales_volume`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
