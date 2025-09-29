---
sidebar_position: 3
title: HBAR Total Released
---

# HBAR Total Released

## Overview
The HBAR Total Released statistic represents the circulating (released) supply of HBAR tokens on the Hedera network. This metric tracks the amount of HBAR that has been released from treasury accounts into circulation since mirror node data collection began. Unlike the fixed total supply of 50 billion HBAR, the released supply changes over time as treasury accounts distribute or reclaim HBAR, providing a dynamic view of the actual circulating tokens available in the ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`hbar_total_released`**

## Methodology

- **Calculation Formula:** Released Supply = Calibration Constant - Cumulative Treasury Flows
- **Calibration Constant:** 351,871,530,222,399,283 tinybars (~3.52B HBAR) - accounts for distributions before mirror node data begins
- **Implementation:**
  - Tracks cumulative net flows from 548 designated treasury/system accounts since Sept 13, 2019 22:00 UTC
  - Uses the `crypto_transfer` table from when mirror node data collection began
  - Note: ~3.52B HBAR were already released when mirror node data starts
  - Negative flows from treasury accounts represent releases into circulation
  - Positive flows to treasury accounts represent returns from circulation

- **Treasury Accounts Tracked (548 total):**
  - 0.0.2: Primary Hedera Treasury account
  - 0.0.42: System account
  - 0.0.44-71: 28 system accounts
  - 0.0.73-87: 15 system accounts
  - 0.0.99-100: 2 system accounts
  - 0.0.200-349: 150 reserved accounts
  - 0.0.400-750: 351 reserved accounts

## Data Representation

The released supply metric provides a time-series view of HBAR circulation from September 13, 2019 22:00 UTC (when mirror node data begins) to present. Each data point represents the total released supply at that moment in time, calculated as the cumulative sum of all treasury flows up to that point.

The metric is stored for multiple time periods (day, week, month, quarter, year) to support various analysis needs. Values are stored in tinybars for precision (1 HBAR = 100,000,000 tinybars).

## Additional Notes

- The released supply is essential for calculating accurate market capitalization and understanding true token circulation
- True genesis (Aug 24, 2018): ALL 50B HBAR were unreleased
- First mirror node hour (Sept 13, 2019 22:00 UTC): ~3.52B HBAR already released
- The metric updates automatically via scheduled job procedures
- Processing the full history takes approximately 3-5 seconds
- Results can be cross-referenced with the Mirror Node API endpoint `/api/v1/network/supply`

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current released supply

```graphql
query GetCurrentReleasedSupply {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_total_released"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch daily released supply (timeseries, 30 days)

```graphql
query GetDailyReleasedSupply {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_total_released"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 30
  ) {
    total
    start_date
    end_date
  }
}
```

### Fetch weekly supply changes (52 weeks)

```graphql
query GetWeeklySupplyChanges {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_total_released"}, period: {_eq: "week"}}
    order_by: {end_date: desc_nulls_last}
    limit: 52
  ) {
    total
    start_date
    end_date
  }
}
```

### Calculate circulating percentage of total supply

```graphql
query GetSupplyPercentage {
  released: ecosystem_metric(
    where: {name: {_eq: "hbar_total_released"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
  }
  total: ecosystem_metric(
    where: {name: {_eq: "hbar_total_supply"}}
    limit: 1
  ) {
    total
  }
}
```

> **Note:** Divide the `total` response by `100000000` to convert from tinybars to HBAR.

## Available Time Periods

The `period` field supports the following values:

- `day`
- `week`
- `month`
- `quarter`
- `year`

Each period provides cumulative released supply data aggregated at that time interval, enabling both detailed and high-level analysis of supply dynamics.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **HBAR Total Released** statistic outlined in this methodology.

SQL File: `src/metrics/hbar-defi/hbar_total_released.sql`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node (primary data source)
- `crypto_transfer` table for historical treasury flow tracking
- `ecosystem.metric` table for storing calculated results
- Scheduled job procedures for automated updates
