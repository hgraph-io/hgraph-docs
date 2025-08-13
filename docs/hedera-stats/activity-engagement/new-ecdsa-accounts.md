---
sidebar_position: 5
title: New ECDSA Accounts
---

# New ECDSA Accounts

Counts newly created Hedera accounts that use an ECDSA key during the selected period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Names:

- **`new_ecdsa_accounts`** - All new ECDSA accounts
- **`new_ecdsa_accounts_real_evm`** - New ECDSA accounts with real (non-derived) EVM addresses

## Methodology

### Identifying New ECDSA Accounts

The metric counts newly created Hedera accounts that use an ECDSA public key, with precise filters applied to ensure accuracy.

#### Qualifying Criteria for Accounts

To be included in the count, each account must meet **all** of the following requirements:

- **Entity Type:** The account must have `type = 'ACCOUNT'`.
- **Key Field:** The `key` field must be present (`key IS NOT NULL`), indicating the account is cryptographically controlled.
- **Creation Timestamp:** The account must have a valid creation timestamp (`created_timestamp IS NOT NULL`).
- **ECDSA Key Identification:**
  - The account’s `public_key` must begin with either `02` or `03`.
  - These hexadecimal prefixes correspond to compressed ECDSA public keys, as specified in common cryptographic standards.
  - Accounts with public keys starting with other values are excluded.
- **Time Window:**
  - Only accounts created within the requested time period are included.
  - This is enforced by ensuring `created_timestamp` falls between the given `start_timestamp` and `end_timestamp` parameters (expressed in nanoseconds since epoch).

#### Extraction Process

All rows in the `entity` table are evaluated against the criteria above. Accounts that match **every** filter are included as "new ECDSA accounts" for subsequent counting and aggregation.

### Identifying New ECDSA Accounts with Real EVM Addresses

The **`new_ecdsa_accounts_real_evm`** metric provides additional filtering to count only ECDSA accounts that have explicitly set, real EVM addresses (not derived from the Hedera account ID).

#### Additional Filtering for Real EVM Addresses

In addition to all the standard ECDSA account criteria above, this metric applies two additional filters:

- **EVM Address Presence:** The account must have an explicitly set EVM address (`evm_address IS NOT NULL`).
- **Non-Derived Address Check:** The EVM address must NOT be the default derived address that Hedera automatically generates from the account ID.
  - Hedera derives a default EVM address using the pattern: 4 bytes shard + 8 bytes realm + 8 bytes num (all zero-padded, big-endian)
  - The function excludes accounts where the EVM address matches this pattern: `encode(evm_address, 'hex') <> lpad(to_hex(shard), 8, '0') || lpad(to_hex(realm), 16, '0') || lpad(to_hex(num), 16, '0')`

#### Why Filter for Real EVM Addresses?

This distinction is important because:

- **Derived addresses** are automatically generated for every Hedera account and don't necessarily indicate EVM usage intent
- **Real EVM addresses** are explicitly set and typically indicate accounts that are actively used for EVM/smart contract interactions
- This metric provides a more accurate count of accounts genuinely participating in the EVM ecosystem on Hedera

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new ECDSA accounts (hourly)

```graphql
query NewECDSAAccountsHour {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_ecdsa_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### Fetch daily new ECDSA accounts for 1 month (timeseries)

```graphql
query DailyNewECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 30
    where: {name: {_eq: "new_ecdsa_accounts"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch current new ECDSA accounts with real EVM addresses (hourly)

```graphql
query NewECDSAAccountsRealEVMHour {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_ecdsa_accounts_real_evm"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### Fetch daily new ECDSA accounts with real EVM addresses for 1 month (timeseries)

```graphql
query DailyNewECDSAAccountsRealEVM {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 30
    where: {name: {_eq: "new_ecdsa_accounts_real_evm"}, period: {_eq: "day"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL functions that calculate the **New ECDSA Accounts** statistics outlined in this methodology.

SQL Functions:

- `ecosystem.dashboard_new_ecdsa_accounts` - All new ECDSA accounts
- `ecosystem.new_ecdsa_accounts_real_evm` - New ECDSA accounts with real (non-derived) EVM addresses

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
