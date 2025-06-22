---
sidebar_position: 19
title: Total ECDSA Accounts
---

# Total ECDSA Accounts

This statistic shows the cumulative number of Hedera accounts secured with ECDSA keys.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`total_ecdsa_accounts`**

## Methodology

The SQL function aggregates all account creations filtered by the ECDSA key type.

```sql
SELECT * FROM ecosystem.dashboard_total_ecdsa_accounts('day');
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total ECDSA accounts

```graphql
query TotalECDSAAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "total_ecdsa_accounts"}}
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

### Fetch daily total ECDSA accounts (timeseries)

```graphql
query DailyTotalECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "total_ecdsa_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
