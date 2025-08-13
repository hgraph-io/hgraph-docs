---
sidebar_position: 1
title: HBAR Price
---

# HBAR Price: Average USD Conversion

## Overview
The HBAR Price statistic provides the latest price of HBAR, aggregated from multiple sources. This statistic is essential for tracking the value of HBAR in real time and analyzing price trends over different timeframes.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`avg_usd_conversion`**

## Methodology
- **Data Sources:** Binance, Bybit, OKX, Bitget and MEXC
- **Aggregation:**
  - The average of candlestick closing prices for a given period for the HBAR/USDT pair on the five major exchanges by trading volume was calculated.
  - The price is multiplied by 10,000 for integer representation for each time period.

## Data Representation
Each period represents the latest available HBAR price at the given timestamp. This metric is useful for tracking price fluctuations and market trends.

## Additional Notes
- HBAR price fluctuations can be influenced by market conditions, trading volume, and broader crypto trends.
- Future enhancements may include price history tracking, moving averages, and volatility analysis.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch most recent HBAR price

```graphql
query GetHBARPrice {
  metric: ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch hourly HBAR price (timeseries, 365 days)

```graphql
query HourlyHBARPrice {
  metric: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### 7 day percentage change (168 hours)

```graphql
query HBAR7DayChange {
  current: ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 0
  ) {
    total
  }
  previous: ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 168
  ) {
    total
  }
}
```

> **Note:** Divide the response by `100000` to place decimal for USD formatting.

## Available Time Periods

The `period` field supports the following values:

- `hour`
- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **HBAR Price** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_avg_usd_conversion`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
* APIs: Binance, Bybit, OKX, Bitget and MEXC