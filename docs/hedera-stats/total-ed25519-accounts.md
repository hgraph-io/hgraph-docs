---
sidebar_position: 20
title: Total ED25519 Accounts
---

# Total ED25519 Accounts

This metric reports the total number of Hedera accounts that use ED25519 keys.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`total_ed25519_accounts`**

## Methodology

The SQL function aggregates all ED25519 account creations to produce a cumulative count.

```sql
SELECT * FROM ecosystem.dashboard_total_ed25519_accounts('day');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total ED25519 accounts

```graphql
query TotalED25519AccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "total_ed25519_accounts"}}
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

### Fetch daily total ED25519 accounts (timeseries)

```graphql
query DailyTotalED25519Accounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "total_ed25519_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
