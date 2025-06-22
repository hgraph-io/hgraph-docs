---
sidebar_position: 13
title: New ECDSA Accounts
---

# New ECDSA Accounts

Counts newly created Hedera accounts that use an ECDSA key during the selected period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_ecdsa_accounts`**

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

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new ECDSA accounts (hourly)

```graphql
query NewECDSAAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_ecdsa_accounts"}}
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

### Fetch hourly new ECDSA accounts (timeseries)

```graphql
query HourlyNewECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_ecdsa_accounts"}, period: {_eq: "hour"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
