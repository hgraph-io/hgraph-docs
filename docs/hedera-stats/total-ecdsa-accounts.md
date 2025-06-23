---
sidebar_position: 10
title: Total ECDSA Accounts
---

# Total ECDSA Accounts

This statistic shows the cumulative number of Hedera accounts secured with ECDSA keys.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`total_ecdsa_accounts`**

## Methodology

### Identifying ECDSA Accounts

To determine the total number of Hedera accounts created with ECDSA cryptographic keys, the calculation begins by querying the canonical `entity` table for all entries that satisfy the following conditions:

- **Account Type**: Only entities where `type = 'ACCOUNT'` are considered, ensuring that only actual user accounts (not contracts or tokens) are included.
- **Time Window**: The account’s `created_timestamp` must fall within the boundaries defined by the user-specified `start_timestamp` and `end_timestamp` parameters.
- **ECDSA Key Filter**: The account’s `public_key` field must begin with either `02` or `03` (i.e., `public_key LIKE '02%' OR public_key LIKE '03%'`). These hexadecimal prefixes indicate compressed ECDSA public keys on the Hedera network.

This filtering isolates all account creation events specifically for ECDSA-backed accounts within the requested time window.

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

The `period` field supports the following values:

- `day`
- `week`
- `month`
- `quarter`
- `year`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
