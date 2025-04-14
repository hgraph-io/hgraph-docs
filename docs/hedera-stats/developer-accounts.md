---
sidebar_position: 10
title: Developer Accounts
---

# Active Developer Accounts

An active developer account is any account that performs at least one “creative” or infrastructure-oriented action over a specified period. Examples include deploying or updating smart contracts, creating or minting tokens, or setting up and modifying consensus topics. These accounts represent users who are actively building or expanding the network’s capabilities rather than simply consuming existing services.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_developer_accounts`**

## Methodology

### Qualifying Transaction Types

**Note:** Only transactions with a result code of `22` (success) are included. Developer accounts are identified by their involvement in one or more of the following activities. Any single occurrence of one of these transactions during the measurement period qualifies the account as a "developer account." The parentheses below include the Mirror Node transaction type IDs.

- **Smart Contract-Related**:
  - Creating a new smart contract (`CONTRACT CREATE` | type = `8`)
  - Updating or upgrading a smart contract (`CONTRACT UPDATE` | type = `9`)

- **Consensus Service-Related**:
  - Creating a new topic (`TOPIC CREATE` | type = `24`)
  - Updating an existing topic (`TOPIC UPDATE` | type = `25`)

- **Token-Related**:
  - Creating a new token (`TOKEN CREATE` | type = `29`)
  - Updating a token’s properties (`TOKEN UPDATE` | type = `36`)
  - Minting new tokens (`TOKEN MINT` | type = `37`)
  - Token “airdrop” (if considered a “creative” transaction) (`TOKEN AIRDROP` | type = `58`)

:::note Hedera Transaction Types
[See this link](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js) for all Hedera transaction codes.
:::

### Exclusion Criteria

- Accounts that do not perform any of the above developer-oriented transactions are not considered developers.
- Regular transactional activity like simple HBAR transfers, token transfers without creation/minting, or reading contract states does not qualify.

## Use Case Example

If you are measuring weekly developer accounts, review all transactions in the past seven days. If an account created a token, minted a new batch of tokens, or deployed a smart contract during that week, it is classified as a developer account for that period.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active developer accounts (hourly)

```graphql
query ActiveAccountsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_developer_accounts"}}
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

### Fetch hourly active developer accounts (timeseries)

```graphql
query HourlyActiveAccounts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_developer_accounts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

> Note: We are using `end_date: {_is_null: false}` to avoid double counting.

## Available Time Periods

- `hour`

Developer accounts are identified based on contract creation, token minting, and other advanced operations. If no results are found, check for missing transactions in the period.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active Developer Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_developer_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node