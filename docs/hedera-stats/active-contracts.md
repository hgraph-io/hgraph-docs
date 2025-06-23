---
sidebar_position: 22
title: Active Smart Contracts
---

# Active Smart Contracts

The Active Contracts statistic shows the number of unique smart contracts that have been successfully invoked at least once in a state-changing (gas-consuming) transaction within a specified time window. This highlights real engagement with the network, rather than just counting deployed but idle contracts.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`active_smart_contracts`**

## Methodology

### Identify Smart Contract Accounts
Active contracts are identified by querying the mirror node for successful executions (`transaction_result = 22` (success)). Each successful contract call reflects a state change, consuming gas and modifying on-chain data.

### Define the Activity Criteria
A contract is considered "active" if it has executed at least one successful (state-changing) transaction within the specified time period.

**Inclusion Criteria:**
- Transactions where `transaction_result = 22` (success).
- Transactions that consume gas, indicating the contract executed logic beyond just reading data.
- Typical examples include `CONTRACTCALL` transactions that update contract state, mint tokens, transfer values, or perform other on-chain actions that alter the network's ledger.

**Exclusion Criteria:**
- Read-only calls that do not produce a transaction record.
- Any data retrieval operations or RPC queries that do not modify state.
- Failed transactions that do not lead to state changes (i.e., `transaction_result != 22`).

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current active smart contracts (hourly)

```graphql
query ActiveSmartContracts {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "active_smart_contracts"}}
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

### Fetch hourly active smart contracts (timeseries)

```graphql
query HourlyActiveSmartContracts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "active_smart_contracts"}, period: {_eq: "hour"}}
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

If the query returns missing data, verify that contract execution transactions exist for the given period and check for potential API delays.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active Smart Contracts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_smart_contracts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node