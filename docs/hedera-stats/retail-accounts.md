---
sidebar_position: 19
title: Active Retail Accounts
---

# Active Retail Accounts

Active retail accounts is a composite statistic calculated using the data from *Active Accounts*, *Active Developer Accounts* and *Active Smart Contracts*. This composite statistic exposes a sub-group of *Active Accounts* which are accounts that display no developer related transactions and are not smart contracts.

This means that before “retail accounts” are identified, any smart contract payers and any accounts that performed developer-like actions.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`active_retail_accounts`**

## Methodology

### Prerequisites
1. **[Active Accounts](active-accounts):** The number of unique accounts that initiate *successful* transactions within a timeframe.
2. **[Developer Accounts](developer-accounts):** The number of unique accounts that perform developer-oriented transactions (e.g., creating/updating contracts, tokens, or topics).
3. **[Active Smart Contracts](active-contracts):** The number of unique contract entities that perform at least one action (such as contract calls) during the same timeframe.

### Calculation Overview

1. **Exclude Smart Contracts**: We ignore any account whose `entity.type` is `CONTRACT`.  
2. **Exclude Developer Transactions**: We exclude any account that performed specific “developer” transaction types.  
3. **Count Remaining Accounts**: The remaining active accounts (those with *successful* transactions but none of the developer transaction types) are considered “retail.”

Formally: 

```
Retail Accounts = Active Accounts - (Developer Accounts + Active Smart Contract Accounts)
```

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active retail accounts (hourly average)

```graphql
query ActiveRetailAccounts {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_retail_accounts"}}
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

### Fetch hourly active retail accounts (timeseries)

```graphql
query HourlyActiveRetailAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_retail_accounts"}, period: {_eq: "hour"}}
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
- `week`
- `month`
- `quarter`
- `year`

Retail accounts exclude smart contracts and developer accounts. Ensure that the queried period contains active transactions from non-developer users.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL functions that calculate the **Active Retail Accounts** statistic outlined in this methodology.

SQL Functions: `ecosystem.dashboard_active_accounts`, `ecosystem.dashboard_active_contracts` and `ecosystem.dashboard_active_developer_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node