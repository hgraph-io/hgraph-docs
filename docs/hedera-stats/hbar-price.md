---
sidebar_position: 3
title: HBAR Price
---

# HBAR Price: Average USD Conversion

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

## Overview
The HBAR Price statistic provides the latest price of HBAR, aggregated from multiple sources. This statistic is essential for tracking the value of HBAR in real time and analyzing price trends over different timeframes.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

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

## Fetching HBAR Price via GraphQL

To retrieve the current HBAR price:

```graphql
query GetHBARPrice {
  ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "hour"}}
    order_by: {start_date: desc}
    limit: 1
  ) {
    total
    start_date
  }
}
```

> **Note:** Divide the response by `100000` to place decimal for USD formatting.

## Available Time Periods

The `period` field supports the following values:

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **HBAR Price** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_avg_usd_conversion`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
* APIs: Binance, Bybit, OKX, Bitget and MEXC