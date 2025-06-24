---
sidebar_position: 20
title: Total Smart Contracts
---

# Total Smart Contracts

Total Smart Contracts represents the cumulative number of contract entities deployed on Hedera.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`total_smart_contracts`**

## Methodology

### Identifying Smart Contract Creations

The Total Smart Contracts stat is calculated by identifying all smart contract creation events within the Hedera ledger. The function performs the following steps to determine the cumulative total:

- **Entity Type Filter**: Only entities with `type = 'CONTRACT'` are included in the calculation, ensuring that only genuine smart contract creation events are counted. Other entity types, such as accounts or tokens, are excluded.
- **Creation Timestamp Range**: Smart contracts are considered only if their `created_timestamp` falls within the user-specified `start_timestamp` and `end_timestamp` boundaries. This enables calculation over custom or pre-defined time windows and guarantees that only contracts created within the requested period are considered.

This filtering produces a list of all new smart contract entities deployed within the specified timeframe.

### Processing Logic

- **Extraction**: Each qualifying row from the entity table represents a single smart contract creation, as determined by its `created_timestamp`.
- **Aggregation Preparation**: The set of creation timestamps generated in the previous step is prepared for further processing, such as grouping or period assignment, in downstream logic.
- **Resulting Set**: The resulting dataset is a time-bounded collection of all contract creation events. Each entry corresponds to a unique contract deployment and serves as the atomic unit for aggregation and cumulative calculations downstream.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total ECDSA accounts (day)

```graphql
query TotalSmartContractsDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_smart_contracts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly total Ed25519 accounts for 1 year (timeseries)

```graphql
query TotalSmartContractsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_smart_contracts"}, period: {_eq: "month"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

The `period` field supports the following values:

- `day`
- `week`
- `month`
- `quarter`
- `year`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total Smart Contracts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_smart_contracts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
