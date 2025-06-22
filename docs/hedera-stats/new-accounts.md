---
sidebar_position: 14
title: New Accounts
---

# New Accounts

The **New Accounts** metric tracks the number of Hedera accounts created within a specific time period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_accounts`**

## Methodology

The SQL function counts accounts whose `created_timestamp` falls within each time bucket.

```sql
-- Example invocation
SELECT * FROM ecosystem.dashboard_new_accounts('hour');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new accounts (hourly)

```graphql
query NewAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_accounts"}}
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

### Fetch hourly new accounts (timeseries)

```graphql
query HourlyNewAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
