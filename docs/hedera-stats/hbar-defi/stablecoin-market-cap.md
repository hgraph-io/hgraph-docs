---
sidebar_position: 2
---

# Stablecoin Market Cap

The Stablecoin Market Cap metric tracks the market capitalization of stablecoins circulating on the Hedera network as reported by DeFiLlama. This metric provides insight into the adoption and liquidity of stablecoins within the ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`stablecoin_marketcap`**

## Methodology

### Data Source
- **Fetch Method:** Stablecoin data is retrieved via an HTTP call to DeFiLlama’s Hedera endpoint at [https://stablecoins.llama.fi/stablecoincharts/Hedera](https://stablecoins.llama.fi/stablecoincharts/Hedera).
- **JSON Structure:** The API returns an array of JSON objects, each containing:
  - `date` (Unix time in seconds)
  - `totalCirculating` (a nested JSON object from which the `peggedUSD` value is extracted)

### Aggregation & Processing
1. **Parse JSON:** Each JSON record is parsed from the API response.
2. **Extract Market Cap:** The `peggedUSD` value is extracted from the `totalCirculating` object to represent the stablecoin market cap.
3. **Convert Timestamps:** The `date` field is converted from Unix time (seconds) to a timestamp using `to_timestamp(date_sec)`.
4. **Define Time Period:** A day-long time range is created for each record by subtracting one day from the converted timestamp. This range is represented as an `int8range` (with the start and end timestamps in nanoseconds).
5. **No Grouping or Averaging:** Each record directly corresponds to a day-long period. There is no grouping of multiple records or averaging of market cap values.

### Data Representation
- **Output Columns:**
  - `timestamp_range`: A Postgres `int8range` indicating the start and end timestamps (in nanoseconds) of the day-long period.
  - `total`: The stablecoin market cap (in USD) for that period, derived directly from the `peggedUSD` value.

## Use Case Example

This statistic helps gauge network health by tracking the liquidity and adoption of stablecoins, which are vital for smooth financial transactions. A sustained increase in stablecoin market cap can indicate growing confidence in the network's financial ecosystem.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch most recent Stablecoin Marketcap

```graphql
query GetLatestSCMC {
  ecosystem_metric(
    where: {name: {_eq: "stablecoin_marketcap"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch daily Stablecoin Marketcap (timeseries)

```graphql
query DailyStablecoinMarketCap {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "stablecoin_marketcap"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### 30 day percentage change

```graphql
query SCMC7DayChange {
  current: ecosystem_metric(
    where: {name: {_eq: "stablecoin_marketcap"}, period: {_eq: "day"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 0
  ) {
    total
  }
  previous: ecosystem_metric(
    where: {name: {_eq: "stablecoin_marketcap"}, period: {_eq: "day"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 7
  ) {
    total
  }
}
```

## Available Time Periods

The `period` field supports the following values:

- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Stablecoin Market Cap** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_stablecoin_marketcap`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
- Hedera mirror node
- Internet access (to fetch data via `http_get` from DeFiLlama)