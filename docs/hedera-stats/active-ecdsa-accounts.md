---
sidebar_position: 22
title: Active ECDSA Accounts
---

# Active ECDSA Accounts

Active ECDSA Accounts counts unique accounts with ECDSA keys that pay for at least one transaction within a given timeframe.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_ecdsa_accounts`**

## Methodology

### Identifying Active ECDSA Accounts

This metric quantifies the number of unique Hedera accounts with ECDSA keys that have paid for at least one transaction within each measurement period.

#### Account and Transaction Selection Criteria

To qualify as an “active ECDSA account” for a given period, the following steps are performed:

- **Transaction Inclusion:** Only transactions that fall within the specified time window are considered.
- **Payer Account Filtering:** For each transaction, the `payer_account_id` is examined to ensure it represents a valid account (using the `entity` table).
- **ECDSA Key Check:** Accounts must have a public key starting with `02` or `03`, which corresponds to compressed ECDSA public keys in hexadecimal notation. Only accounts with non-null, properly assigned keys are included.
- **Account Validity:** The account must have a non-null `created_timestamp`, confirming that it was validly created on the network.

Any transaction paid for by an account that does not meet all these criteria is excluded from the calculation.

#### Counting Unique Active Accounts per Period

- **Grouping by Period:** All qualifying transactions are grouped according to the requested time interval (for example, `hour`). This is achieved by truncating each transaction's consensus timestamp to the appropriate period boundary.
- **Uniqueness:** For each time period, only unique payer accounts are counted. Multiple transactions by the same account within a period are counted as a single active account for that period.

#### Output Construction

- For each period, the final output provides:
  - The time range for the period (expressed as a range between the start of the period and the start of the next).
  - The total number of unique active ECDSA accounts in that period.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active ECDSA accounts (hourly)

```graphql
query ActiveECDSAAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_ecdsa_accounts"}}
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

### Fetch hourly active ECDSA accounts (timeseries)

```graphql
query HourlyActiveECDSAAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_ecdsa_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active ECDSA Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_ecdsa_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
