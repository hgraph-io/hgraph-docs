---
sidebar_position: 15
title: New ECDSA Accounts
---

# New ECDSA Accounts

Counts newly created Hedera accounts that use an ECDSA key during the selected period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_ecdsa_accounts`**

## Methodology

The SQL function filters new accounts by key type and groups them by time bucket.

```sql
SELECT * FROM ecosystem.dashboard_new_ecdsa_accounts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new ECDSA accounts (hourly)

```graphql
query NewECDSAAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_ecdsa_accounts"}}
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

### Fetch hourly new ECDSA accounts (timeseries)

```graphql
query HourlyNewECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_ecdsa_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
