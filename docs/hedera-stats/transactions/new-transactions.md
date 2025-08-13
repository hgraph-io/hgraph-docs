---
sidebar_position: 1
title: New Transactions
---

This statistic tracks the volume of new transactions processed on the Hedera network over time, providing insights into network activity and usage patterns. The data is segmented by transaction service type (Crypto, HCS, HFS, HSCS, HTS, and Other), enabling detailed analysis of which Hedera services are being utilized most frequently.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Names:

- **`new_transactions`** - Total of all new transactions
- **`new_crypto_transactions`** - New cryptocurrency transfer transactions
- **`new_hcs_transactions`** - New Hedera Consensus Service transactions
- **`new_hfs_transactions`** - New Hedera File Service transactions
- **`new_hscs_transactions`** - New Hedera Smart Contract Service transactions
- **`new_hts_transactions`** - New Hedera Token Service transactions
- **`new_other_transactions`** - New miscellaneous/other transactions

## Methodology

### Identifying New Transactions (All)

To determine the number of new transactions on the Hedera network, the calculation queries the canonical `transaction` table for all entries that satisfy the following conditions:

- **Time Window**: The transaction's `consensus_timestamp` must fall within the boundaries defined by the user-specified `start_timestamp` and `end_timestamp` parameters.
- **Periodization**: Transactions are grouped by the specified period (day, week, month, quarter, or year) based on their consensus timestamp.

This provides a count of all transactions occurring within each time period in the requested window.

### Transaction Type Categories

The Hedera network classifies transactions into different service categories based on their type ID. Each category represents a different set of operations available on the network:

#### Crypto Transactions (`new_crypto_transactions`)

Cryptocurrency-related operations including account management and HBAR transfers.

**Type IDs**: 10, 11, 12, 13, 14, 15, 48, 49

These types include:

- Account creation and updates
- Cryptocurrency transfers
- Account deletion
- System operations

#### HCS (Hedera Consensus Service) Transactions (`new_hcs_transactions`)

Operations related to consensus topics for decentralized ordering of messages.

**Type IDs**: 24, 25, 26, 27

These types include:

- Topic creation
- Topic updates
- Topic deletion
- Message submission to topics

#### HFS (Hedera File Service) Transactions (`new_hfs_transactions`)

File storage and management operations on the Hedera network.

**Type IDs**: 16, 17, 18, 19

These types include:

- File creation
- File append operations
- File updates
- File deletion

#### HSCS (Hedera Smart Contract Service) Transactions (`new_hscs_transactions`)

Smart contract deployment and interaction operations.

**Type IDs**: 7, 8, 9, 22, 50

These types include:

- Contract creation
- Contract calls
- Contract updates
- Contract deletion
- Ethereum transactions

#### HTS (Hedera Token Service) Transactions (`new_hts_transactions`)

Token creation and management operations for both fungible and non-fungible tokens.

**Type IDs**: 29, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 45, 46, 47, 53, 57, 58, 59, 60

These types include:

- Token creation and deletion
- Token minting and burning
- Token transfers and associations
- Token freezing and unfreezing
- KYC grant/revoke operations
- Token fee schedule updates
- NFT operations

#### Other Transactions (`new_other_transactions`)

Miscellaneous operations not falling into the above categories.

**Type IDs**: 20, 21, 23, 28, 42, 43, 44, 51, 52, 54, 55, 56, 65

These types include:

- System administration operations
- Network management transactions
- Schedule operations
- Network node operations
- Utility transactions

### Counting Methodology

For each transaction category, the function:

1. Filters transactions by the appropriate type IDs within the time window
2. Groups transactions by the specified period (day, week, month, etc.)
3. Counts the number of transactions in each period
4. Returns the count along with an integer range representing the period boundaries

The result is a time series showing how many new transactions of each type occurred in each period.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current new transactions (all types, daily)

```graphql
query NewTransactionsDay {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly new crypto transactions for 1 year (timeseries)

```graphql
query NewCryptoTransactionsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "new_crypto_transactions"}, period: {_eq: "month"}}
  ) {
    total
    end_date
  }
}
```

### Fetch daily new HTS transactions for 30 days (timeseries)

```graphql
query NewHTSTransactionsDaily {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 30
    where: {name: {_eq: "new_hts_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch weekly new smart contract transactions for 3 months

```graphql
query NewHSCSTransactionsWeekly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "new_hscs_transactions"}, period: {_eq: "week"}}
  ) {
    total
    end_date
  }
}
```

### Compare all transaction types for the last day

```graphql
query CompareTransactionTypes {
  crypto: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_crypto_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  hcs: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_hcs_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  hts: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_hts_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  hscs: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "new_hscs_transactions"}, period: {_eq: "day"}}
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

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL functions that calculate the **New Transactions** statistics outlined in this methodology.

SQL Functions:

- `ecosystem.new_transactions` - Total of all new transactions
- `ecosystem.new_crypto_transactions` - New cryptocurrency transfer transactions
- `ecosystem.new_hcs_transactions` - New Hedera Consensus Service transactions
- `ecosystem.new_hfs_transactions` - New Hedera File Service transactions
- `ecosystem.new_hscs_transactions` - New Hedera Smart Contract Service transactions
- `ecosystem.new_hts_transactions` - New Hedera Token Service transactions
- `ecosystem.new_other_transactions` - New miscellaneous/other transactions

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
