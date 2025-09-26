---
sidebar_position: 2
title: HBAR Total Supply
---

# HBAR Total Supply

## Overview
The HBAR Total Supply statistic represents the fixed, pre-minted supply of HBAR tokens on the Hedera network. At network genesis, exactly 50 billion HBAR were created, establishing the maximum supply that will ever exist. This immutable value is fundamental to understanding Hedera's tokenomics and economic model.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`hbar_total_supply`**

## Methodology
- **Fixed Supply:** 50 billion HBAR (5,000,000,000,000,000,000 tinybars) pre-minted at network genesis
- **Implementation:**
  - This value is hardcoded in the Hedera Mirror Node (`NetworkSupplyViewModel.totalSupply`)
  - Cannot change without unanimous consent of the Hedera Council
  - Stored as a static metric in the ecosystem.metric table for efficient querying

- **Important Note:**
  - When summing all entity balances dynamically, the result is 49,999,943,600 HBAR
  - The missing 56,400 HBAR exists at the protocol level, outside any account
  - This discrepancy is why a static approach is preferred over dynamic calculation

## Data Representation
The total supply metric is stored with entries for all time periods (minute, hour, day, week, month, quarter, year) to provide flexibility in user queries. The timestamp range spans from genesis (September 1, 2019) to a future date, where the upper bound can be interpreted as "last verified."

Since this is a constant value, all queries will return the same result regardless of the time period or date range specified.

## Additional Notes
- The total supply is a cornerstone metric for calculating released supply (see [hbar_total_released](/hedera-stats/hbar-defi/hbar-total-released)), market capitalization, and other economic indicators
- The value is represented in tinybars in the database (1 HBAR = 100,000,000 tinybars)
- Future protocol changes requiring unanimous Hedera Council approval could theoretically modify this value, though this is extremely unlikely

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch HBAR total supply

```graphql
query GetHBARTotalSupply {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_total_supply"}}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch total supply with specific period

```graphql
query GetHBARTotalSupplyDaily {
  metric: ecosystem_metric(
    where: {
      name: {_eq: "hbar_total_supply"}
      period: {_eq: "day"}
    }
    limit: 1
  ) {
    total
    start_date
    end_date
  }
}
```

### Convert to HBAR units

```graphql
query GetHBARTotalSupplyFormatted {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_total_supply"}}
    limit: 1
  ) {
    total_tinybars: total
  }
}
```

> **Note:** Divide the `total` response by `100000000` to convert from tinybars to HBAR. The result will always be 50,000,000,000 HBAR.

## Available Time Periods

The `period` field supports the following values:

- `minute`
- `hour`
- `day`
- `week`
- `month`
- `quarter`
- `year`

All periods return the same constant value. Multiple periods are provided for query flexibility and compatibility with time-series analysis tools.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that populates the **HBAR Total Supply** statistic outlined in this methodology.

SQL File: `src/metrics/hbar-defi/hbar_total_supply.sql`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node (for context and validation)
* No external APIs or dynamic calculations required