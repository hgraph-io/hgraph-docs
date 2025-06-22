---
sidebar_position: 12
title: New Accounts
---

# New Accounts

The **New Accounts** metric tracks the number of Hedera accounts created within a specific time period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_accounts`**

## Methodology

### Defining a "New Account"

- **Account Type Identification:**
  - Only entities with `type = 'ACCOUNT'` are considered for this metric.
  - Other entity types are ignored.

- **Creation Timestamp:**
  - Each qualifying account must have a `created_timestamp`—the point in time when the account was first registered on the Hedera network.

### Filtering by Time Window

- **User-Specified Time Range:**
  - The metric is calculated over a time window defined by the function parameters:
    - `start_timestamp`: The lower bound of the window (inclusive).
    - `end_timestamp`: The upper bound (inclusive; defaults to the current time if not specified).
  - Only accounts created **between** these timestamps are included in the calculation.

### Data Source

- **Entity Table:**
  - The source of truth for account creation events is the `entity` table, which records all entities (accounts, contracts, tokens, etc.) observed on the Hedera network.
  - Only rows where `type = 'ACCOUNT'` are selected in this process.

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

The `period` field supports the following values:

- `hour`
- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
