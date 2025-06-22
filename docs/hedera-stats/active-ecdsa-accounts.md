---
sidebar_position: 22
title: Active ECDSA Accounts
---

# Active ECDSA Accounts

Active ECDSA Accounts counts unique accounts with ECDSA keys that pay for at least one transaction within a given timeframe.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_ecdsa_accounts`**

## Methodology

The SQL function filters payer accounts by key type and aggregates successful transactions per period.

```sql
SELECT * FROM ecosystem.dashboard_active_ecdsa_accounts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active ECDSA accounts (hourly)

```graphql
query ActiveECDSAAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_ecdsa_accounts"}}
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

### Fetch hourly active ECDSA accounts (timeseries)

```graphql
query HourlyActiveECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_ecdsa_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
