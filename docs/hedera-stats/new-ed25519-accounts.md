---
sidebar_position: 14
title: New ED25519 Accounts
---

# New ED25519 Accounts

This metric counts new Hedera accounts that use an ED25519 key during the specified period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_ed25519_accounts`**

## Methodology

### Identifying New ED25519 Accounts

This metric quantifies new Hedera accounts established with an ED25519 cryptographic key during the chosen time period.

#### Qualifying Criteria for Accounts

To be counted as a "new ED25519 account," each entity must satisfy **all** of the following conditions:

- **Entity Type:** The entity record must have `type = 'ACCOUNT'`, ensuring only account creations are considered.
- **Presence of a Key:** The account must include a non-null cryptographic `key` field (`key IS NOT NULL`). This confirms the account is controlled by a cryptographic key and is not a system or non-custodial entity.
- **ED25519 Key Identification:**  
  - The hexadecimal representation of the `key` field must begin with the prefix `0x1220` (expressed as the byte sequence `\x1220`).  
  - This prefix is the unique marker for ED25519 public keys as stored on Hedera, following protobuf serialization conventions.
  - Accounts whose `key` field begins with any other value are excluded from this metric.
- **Creation Timestamp Within Period:**  
  - The account’s `created_timestamp` (expressed in nanoseconds since the Unix epoch) must fall within the specified `start_timestamp` and `end_timestamp` parameters.  
  - Only accounts created during the requested window are included in the count.

#### Extraction Process

Every row in the `entity` table is evaluated against the full set of qualifying criteria above. Only accounts that match **all** filters are selected as new ED25519 accounts for the requested measurement interval.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new ED25519 accounts (hourly)

```graphql
query NewED25519AccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_ed25519_accounts"}}
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

### Fetch hourly new ED25519 accounts (timeseries)

```graphql
query HourlyNewED25519Accounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_ed25519_accounts"}, period: {_eq: "hour"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New ED25519 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_ed25519_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
