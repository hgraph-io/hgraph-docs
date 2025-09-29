---
sidebar_position: 4
title: HBAR Market Cap
---

# HBAR Market Capitalization

## Overview
The HBAR Market Capitalization statistic represents the total market value of all circulating HBAR tokens. This metric is calculated by multiplying the current HBAR price by the circulating supply, providing a key indicator of Hedera's overall market valuation and position within the cryptocurrency ecosystem. Market capitalization is one of the most important metrics for assessing the relative size and value of a cryptocurrency project.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`hbar_market_cap`**

## Methodology

- **Calculation Formula:** Market Cap = (HBAR Price × Circulating Supply) / 100,000,000,000
- **Components:**
  - **HBAR Price (`avg_usd_conversion`):** The aggregated price from major exchanges, stored as price × 100,000
  - **Circulating Supply (`hbar_total_released`):** The released HBAR supply in tinybars (1 HBAR = 100,000,000 tinybars)
- **Implementation:**
  - Joins the `avg_usd_conversion` and `hbar_total_released` metrics from the ecosystem.metric table
  - Performs the multiplication: (price_x100000 × supply_tinybars) / 100,000,000,000
  - Result is stored in cents (×100) for financial precision
  - To display in USD, divide the result by 100

## Data Representation

The market cap metric provides a time-series view of HBAR's total market valuation. Each data point represents the market capitalization at a specific point in time, calculated using the price and circulating supply at that moment.

The metric is available for multiple time periods (hour, day, week, month, quarter, year) to support various analysis needs. Values are stored in cents to maintain precision in financial calculations.

## Additional Notes

- **Historical Data Limitation:** Market cap data is only available from December 9, 2024 onwards, as this is when `avg_usd_conversion` price data collection began
- **Real-time Updates:** The metric updates automatically via scheduled job procedures for all supported time periods
- **Market Cap vs Total Supply:** This metric uses circulating supply (hbar_total_released) not total supply (50B HBAR) for accurate market valuation
- **Precision:** Storing in cents (×100) ensures no loss of precision in financial calculations
- **Performance:** The calculation leverages existing pre-computed metrics for optimal query performance

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current HBAR market cap

```graphql
query GetCurrentMarketCap {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch daily market cap (timeseries, 30 days)

```graphql
query GetDailyMarketCap {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 30
  ) {
    total
    start_date
    end_date
  }
}
```

### Fetch hourly market cap changes (24 hours)

```graphql
query GetHourlyMarketCap {
  metric: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "hour"}}
    order_by: {end_date: desc_nulls_last}
    limit: 24
  ) {
    total
    start_date
    end_date
  }
}
```

### Calculate 7-day market cap change

```graphql
query Get7DayMarketCapChange {
  current: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
  weekAgo: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
    offset: 7
  ) {
    total
    end_date
  }
}
```

### Market cap with price and supply components

```graphql
query GetMarketCapComponents {
  marketCap: ecosystem_metric(
    where: {name: {_eq: "hbar_market_cap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
  price: ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
  }
  supply: ecosystem_metric(
    where: {name: {_eq: "hbar_total_released"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
  }
}
```

> **Note:** Divide the market cap `total` response by `100` to convert from cents to USD. For price, divide by `100000`. For supply, divide by `100000000` to get HBAR.

## Available Time Periods

The `period` field supports the following values:

- `hour`
- `day`
- `week`
- `month`
- `quarter`
- `year`

Each period provides market cap data aggregated at that time interval, enabling both detailed and high-level analysis of market valuation trends.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **HBAR Market Capitalization** statistic outlined in this methodology.

SQL File: `src/metrics/hbar-defi/hbar_market_cap.sql`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- **Metrics Required:**
  - `avg_usd_conversion` - HBAR price data from exchanges
  - `hbar_total_released` - Circulating supply data
- **Database:**
  - `ecosystem.metric` table for accessing pre-computed metrics
- **Scheduled Jobs:**
  - Automated updates via pg_cron job procedures (hourly, daily, weekly, monthly, quarterly, yearly)