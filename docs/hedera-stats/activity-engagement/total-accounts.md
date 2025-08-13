---
sidebar_position: 1
title: Total Accounts
---

# Total Accounts

Total Accounts reflects the cumulative number of Hedera accounts created since genesis.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`total_accounts`**

## Methodology

### Identifying Account Creation Events

Only rows from the `entity` table where the entity `type` is `'ACCOUNT'` are included. This step ensures that the statistic exclusively counts newly created Hedera accounts and excludes other entities such as contracts or tokens.

### Event Selection Logic

- **Qualifying Records:** Each qualifying record represents a unique Hedera account created within the defined interval. No other entity types or account lifecycle events (such as updates or deletions) are considered—only original account creation timestamps are included.
- **Resulting Dataset:** The resulting dataset consists of all Hedera account creation events occurring within the target time range. This serves as the foundational data for all downstream calculations in the metric.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total accounts (day)

```graphql
query TotalAccountsDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly total accounts for 1 year (timeseries)

```graphql
query TotalAccountsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_accounts"}, period: {_eq: "month"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
