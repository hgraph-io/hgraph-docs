---
sidebar_position: 10
title: Total ECDSA Accounts
---

# Total ECDSA Accounts

This statistic shows the cumulative number of Hedera accounts secured with ECDSA keys.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Names:
- **`total_ecdsa_accounts`** - Total of all ECDSA accounts
- **`total_ecdsa_accounts_real_evm`** - Total ECDSA accounts with real (non-derived) EVM addresses

## Methodology

### Identifying ECDSA Accounts

To determine the total number of Hedera accounts created with ECDSA cryptographic keys, the calculation begins by querying the canonical `entity` table for all entries that satisfy the following conditions:

- **Account Type**: Only entities where `type = 'ACCOUNT'` are considered, ensuring that only actual user accounts (not contracts or tokens) are included.
- **Time Window**: The account’s `created_timestamp` must fall within the boundaries defined by the user-specified `start_timestamp` and `end_timestamp` parameters.
- **ECDSA Key Filter**: The account’s `public_key` field must begin with either `02` or `03` (i.e., `public_key LIKE '02%' OR public_key LIKE '03%'`). These hexadecimal prefixes indicate compressed ECDSA public keys on the Hedera network.

This filtering isolates all account creation events specifically for ECDSA-backed accounts within the requested time window.

### Identifying ECDSA Accounts with Real EVM Addresses

The **`total_ecdsa_accounts_real_evm`** metric provides a rolling total of ECDSA accounts that have explicitly set, real EVM addresses (not derived from the Hedera account ID).

#### Additional Filtering for Real EVM Addresses

In addition to all the standard ECDSA account criteria above, this metric applies two additional filters:

- **EVM Address Presence:** The account must have an explicitly set EVM address (`evm_address IS NOT NULL`).
- **Non-Derived Address Check:** The EVM address must NOT be the default derived address that Hedera automatically generates from the account ID.
  - Hedera derives a default EVM address using the pattern: 4 bytes shard + 8 bytes realm + 8 bytes num (all zero-padded, big-endian)
  - The function excludes accounts where the EVM address matches this pattern: `encode(evm_address, 'hex') <> lpad(to_hex(shard), 8, '0') || lpad(to_hex(realm), 16, '0') || lpad(to_hex(num), 16, '0')`

#### Why Track Real EVM Addresses?

This distinction is important because:
- **Derived addresses** are automatically generated for every Hedera account and don't necessarily indicate EVM usage intent
- **Real EVM addresses** are explicitly set and typically indicate accounts that are actively used for EVM/smart contract interactions
- This metric provides a more accurate count of accounts genuinely participating in the EVM ecosystem on Hedera

#### Rolling Total Calculation

The total is calculated as a cumulative sum:
1. First, it counts all qualifying accounts created before the requested time window start
2. Then, it adds new qualifying accounts created within the time window, grouped by the requested period
3. The result is a running total that increases over time as new ECDSA accounts with real EVM addresses are created

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total ECDSA accounts (day)

```graphql
query TotalECDSAAccountsDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_ecdsa_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly total ECDSA accounts for 1 year (timeseries)

```graphql
query TotalECDSAAccountsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_ecdsa_accounts"}, period: {_eq: "month"}}
  ) {
    total
    end_date
  }
}
```

### Fetch current total ECDSA accounts with real EVM addresses (day)

```graphql
query TotalECDSAAccountsRealEVMDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_ecdsa_accounts_real_evm"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch weekly total ECDSA accounts with real EVM addresses for 3 months (timeseries)

```graphql
query TotalECDSAAccountsRealEVMWeekly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_ecdsa_accounts_real_evm"}, period: {_eq: "week"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL functions that calculate the **Total ECDSA Accounts** statistics outlined in this methodology.

SQL Functions:

- `ecosystem.dashboard_total_ecdsa_accounts` - Total of all ECDSA accounts
- `ecosystem.total_ecdsa_accounts_real_evm` - Total ECDSA accounts with real (non-derived) EVM addresses

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
