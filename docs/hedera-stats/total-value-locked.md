---
sidebar_position: 5
title: Total Value Locked
---

# Total Value Locked (TVL)

Total Value Locked (TVL) represents the total amount of assets locked within decentralized finance (DeFi) protocols on the Hedera network. This metric provides insights into liquidity, ecosystem adoption, and capital efficiency within Hedera’s DeFi landscape.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`network_tvl`**

## Methodology

1. **Data Source**  
   - TVL data is retrieved from the [DeFiLlama](https://api.llama.fi/v2/historicalChainTvl/Hedera) API.

2. **HTTP Retrieval & JSON Parsing**  
   - The procedure calls `http_get('https://api.llama.fi/v2/historicalChainTvl/Hedera')` and parses the JSON to extract `date` (in seconds) and `tvl`.

3. **Timestamp Conversion & Daily Range Calculation**  
   - Each `date_sec` is converted with `to_timestamp(date_sec)`, and a daily time range is computed using the `int8range` function.

4. **Insertion into Metrics Table**  
   - Each record is inserted into the table. If a matching record exists, the TVL value is updated.

5. **Final Output**
   - Each row represents a daily TVL measurement with its corresponding time range.

# Use Case Example

Monitoring TVL helps gauge overall network health by reflecting the amount of capital engaged in Hedera's DeFi ecosystem. For example, a rising TVL indicates increasing liquidity and user confidence.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch most recent Hedera TVL

```graphql
query GetLatestTVL {
  ecosystem_metric(
    where: {name: {_eq: "network_tvl"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch daily TVL (timeseries)

```graphql
query DailyTVL {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "network_tvl"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### 7 day percentage change

```graphql
query TVL7DayChange {
  current: ecosystem_metric(
    where: {name: {_eq: "network_tvl"}, period: {_eq: "day"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 0
  ) {
    total
  }
  previous: ecosystem_metric(
    where: {name: {_eq: "network_tvl"}, period: {_eq: "day"}}
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

TVL is aggregated from DeFi protocols and updates daily. If values seem incorrect, check the most recent transactions affecting locked assets.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total Value Locked** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_network_tvl`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
- Hedera mirror node
- Internet access (to fetch data via `http_get` from DeFiLlama)