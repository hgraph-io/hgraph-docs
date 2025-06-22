---
sidebar_position: 16
title: New ED25519 Accounts
---

# New ED25519 Accounts

This metric counts new Hedera accounts that use an ED25519 key during the specified period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_ed25519_accounts`**

## Methodology

The SQL function selects accounts with ED25519 keys and tallies creations per time bucket.

```sql
SELECT * FROM ecosystem.dashboard_new_ed25519_accounts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new ED25519 accounts (hourly)

```graphql
query NewED25519AccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_ed25519_accounts"}}
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

### Fetch hourly new ED25519 accounts (timeseries)

```graphql
query HourlyNewED25519Accounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_ed25519_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
