---
sidebar_position: 17
title: New Smart Contracts
---

# New Smart Contracts

The **New Smart Contracts** metric counts contract entities created on Hedera during the chosen period.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

GraphQL API Endpoint: **`new_smart_contracts`**

## Methodology

### Qualifying Contract Creations

To be counted as a **new smart contract**, an event must satisfy **all** the following criteria:

- **Entity Type:** The entity must be a smart contract (`entity.type = 'CONTRACT'`).
- **Direct Transaction Match:** The entity’s `created_timestamp` must exactly match the `consensus_timestamp` of a transaction (`entity.created_timestamp = transaction.consensus_timestamp`).
- **Transaction Type:** The transaction must be a `CONTRACTCREATEINSTANCE` operation (`transaction.type = 8`). See [Hedera Mirror Node transaction codes](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js) for all type and result definitions.
- **Transaction Success:** The transaction must have completed successfully (`transaction.result = 22`).

### Data Selection Process

1. **Join entity and transaction tables:**  
   - For each contract entity, find the matching transaction by equating the contract’s `created_timestamp` to the transaction’s `consensus_timestamp`.

2. **Apply Qualification Filters:**  
   - Only include records where:
     - The entity is of type `CONTRACT`.
     - The transaction type is `8` (`CONTRACTCREATEINSTANCE`).
     - The transaction result is `22` (success).
     - The timestamp is within the desired range.

3. **Output:**  
   - The result is a filtered list of all smart contracts **successfully created** in the specified time window.

### Metric Calculation

Once all qualifying contract creation events have been selected, they are **passed to downstream logic for time-based aggregation**. The *all_entries* step ensures only valid, direct, and successful smart contract creations are counted for each interval.

#### Example

If a smart contract is created at timestamp `T`, and there is a transaction at `T` of type `8` and result `22`, this contract is included in the metric.  
Contracts without a matching successful creation transaction, or created outside the window, are excluded.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new smart contracts (hourly)

```graphql
query NewSmartContractsNow {
  ecosystem_metric_aggregate(
    where: {name: {_eq: "new_smart_contracts"}}
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

### Fetch hourly new smart contracts (timeseries)

```graphql
query HourlyNewSmartContracts {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "new_smart_contracts"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

## Available Time Periods

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **New Smart Contracts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_new_smart_contracts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
