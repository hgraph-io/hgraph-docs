---
sidebar_position: 21
title: Total Smart Contracts
---

# Total Smart Contracts

The **Total Smart Contracts** metric represents the cumulative number of contract entities deployed on Hedera.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`total_smart_contracts`**

## Methodology

This SQL function sums all contract creations to produce the latest total.

```sql
SELECT * FROM ecosystem.dashboard_total_smart_contracts('day');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total smart contracts

```graphql
query TotalSmartContractsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "total_smart_contracts"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}
```

### Fetch daily total smart contracts (timeseries)

```graphql
query DailyTotalSmartContracts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "total_smart_contracts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total Smart Contracts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_smart_contracts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
