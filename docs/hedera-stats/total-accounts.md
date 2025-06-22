---
sidebar_position: 18
title: Total Accounts
---

# Total Accounts

Total Accounts reflects the cumulative number of Hedera accounts created since genesis.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`total_accounts`**

## Methodology

The SQL function returns the latest count of accounts by summing all account creation events.

```sql
SELECT * FROM ecosystem.dashboard_total_accounts('day');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total accounts

```graphql
query TotalAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "total_accounts"}}
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

### Fetch daily total accounts (timeseries)

```graphql
query DailyTotalAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "total_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
