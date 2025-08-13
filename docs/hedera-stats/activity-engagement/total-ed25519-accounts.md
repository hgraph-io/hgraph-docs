---
sidebar_position: 3
title: Total ED25519 Accounts
---

# Total ED25519 Accounts

This statistic reports the total number of Hedera accounts that use ED25519 keys.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`total_ed25519_accounts`**

## Methodology

### Identifying ED25519 Accounts

To determine the number of Hedera accounts that utilize ED25519 cryptographic keys, the calculation begins by scanning the canonical entity table for all accounts that meet the following criteria:

- **Account Type**: Only rows where `type = 'ACCOUNT'` are included, ensuring that non-account entities (e.g., contracts, tokens) are excluded.
- **Time Window**: Only accounts whose `created_timestamp` falls within the user-specified `start_timestamp` and `end_timestamp` range are included in the calculation.
- **ED25519 Key Filter**: Accounts must have a key field whose byte pattern matches the expected prefix for ED25519 public keys. Specifically, the key must start with the hex sequence `1220` (interpreted as `substring(key from 1 for 2) = E'\\x1220'`), which is a network-standard identifier for ED25519 key encoding.

This filtering results in a collection of all account creation events for ED25519-backed accounts within the desired period.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total ECDSA accounts (day)

```graphql
query TotalEd25519AccountsDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_ed25519_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly total Ed25519 accounts for 1 year (timeseries)

```graphql
query TotalEd25519AccountsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_ed25519_accounts"}, period: {_eq: "month"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_total_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
