---
sidebar_position: 23
title: Active ED25519 Accounts
---

# Active ED25519 Accounts

This metric counts unique ED25519 accounts that pay transaction fees within the chosen timeframe.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_ed25519_accounts`**

## Methodology

The SQL function counts successful transactions by ED25519 payer accounts for each period.

```sql
SELECT * FROM ecosystem.dashboard_active_ed25519_accounts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active ED25519 accounts (hourly)

```graphql
query ActiveED25519AccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_ed25519_accounts"}}
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

### Fetch hourly active ED25519 accounts (timeseries)

```graphql
query HourlyActiveED25519Accounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_ed25519_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
