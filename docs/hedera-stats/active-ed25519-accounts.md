---
sidebar_position: 17
title: Active ED25519 Accounts
---

# Active ED25519 Accounts

This metric counts unique ED25519 accounts that pay transaction fees within the chosen timeframe.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_ed25519_accounts`**

## Methodology

### Identifying Active ED25519 Accounts

This statistic measures the count of unique Hedera accounts that use ED25519 public keys and act as payers in at least one transaction within each reporting period.

#### Account and Transaction Qualification

To determine which accounts are included in this metric, the following filters are applied:

- **Transaction Inclusion:** Only transactions with a consensus timestamp that falls within the specified measurement window are considered.
- **Payer Account Selection:** For each transaction, the `payer_account_id` is used to look up the associated entity, ensuring the payer is a valid account.
- **ED25519 Key Requirement:** The account’s public key must begin with the byte sequence `0x1220`, which is the canonical prefix for ED25519 keys in Hedera. This ensures that only accounts secured with an ED25519 key type are included.
- **Account Validity Checks:** Accounts must have a non-null key and a non-null creation timestamp to ensure they are valid, initialized accounts present on the network.

Only transactions paid for by accounts passing all these filters are considered in the calculation.

#### Unique Account Counting per Period

For each defined period, the function counts the number of unique payer accounts that qualified in the above steps. Each account is counted at most once per period, regardless of how many transactions it paid for within that interval.

#### Output Construction

The final output, for each period, includes:

- The time interval corresponding to the start and end of the period.
- The total count of distinct active ED25519 accounts that paid for at least one transaction in that period.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active ED25519 accounts (hourly)

```graphql
query ActiveED25519AccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_ed25519_accounts"}}
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

### Fetch hourly active ED25519 accounts (timeseries)

```graphql
query HourlyActiveED25519Accounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_ed25519_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
