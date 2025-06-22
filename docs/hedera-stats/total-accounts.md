---
sidebar_position: 9
title: Total Accounts
---

# Total Accounts

Total Accounts reflects the cumulative number of Hedera accounts created since genesis.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`total_accounts`**

## Methodology

### Identifying Account Creation Events

- **Entity Table Filtering:**  
  Only rows from the `entity` table where the entity `type` is `'ACCOUNT'` are included. This step ensures that the statistic exclusively counts newly created Hedera accounts and excludes other entities such as contracts or tokens.

### Event Selection Logic

- **Qualifying Records:**  
  Each qualifying record represents a unique Hedera account created within the defined interval. No other entity types or account lifecycle events (such as updates or deletions) are considered—only original account creation timestamps are included.

- **Resulting Dataset:**  
  The resulting dataset consists of all Hedera account creation events occurring within the target time range. This serves as the foundational data for all downstream calculations in the metric.

### Calculation Process

- The filtered list of account creation timestamps is used to aggregate and report the total number of accounts created, as well as to compute cumulative totals for each reporting period.
- Only successful account creation events that meet both the entity type and timestamp requirements contribute to the reported statistics.

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
