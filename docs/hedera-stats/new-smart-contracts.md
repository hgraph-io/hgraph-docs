---
sidebar_position: 17
title: New Smart Contracts
---

# New Smart Contracts

The **New Smart Contracts** metric counts contract entities created on Hedera during the chosen period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_smart_contracts`**

## Methodology

Contracts created within each time bucket are aggregated using their creation timestamps.

```sql
SELECT * FROM ecosystem.dashboard_new_smart_contracts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new smart contracts (hourly)

```graphql
query NewSmartContractsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_smart_contracts"}}
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

### Fetch hourly new smart contracts (timeseries)

```graphql
query HourlyNewSmartContracts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_smart_contracts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New Smart Contracts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_smart_contracts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
