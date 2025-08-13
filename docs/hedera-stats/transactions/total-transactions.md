---
sidebar_position: 2
title: Total Transactions
---

This statistic shows the cumulative total number of transactions processed on the Hedera network since inception. The metric provides a rolling total that increases over time, offering insights into the network's overall growth and adoption. The data is segmented by transaction service type (Crypto, HCS, HFS, HSCS, HTS, and Other), enabling analysis of cumulative usage patterns across different Hedera services.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Names:

- **`total_transactions`** - Cumulative total of all transactions
- **`total_crypto_transactions`** - Cumulative total of cryptocurrency transfer transactions
- **`total_hcs_transactions`** - Cumulative total of Hedera Consensus Service transactions
- **`total_hfs_transactions`** - Cumulative total of Hedera File Service transactions
- **`total_hscs_transactions`** - Cumulative total of Hedera Smart Contract Service transactions
- **`total_hts_transactions`** - Cumulative total of Hedera Token Service transactions
- **`total_other_transactions`** - Cumulative total of miscellaneous/other transactions

## Methodology

### Calculating Total Transactions (All)

To determine the cumulative total number of transactions on the Hedera network, the calculation queries the canonical `transaction` table for all entries that satisfy the following conditions:

- **Time Window**: The transaction's `consensus_timestamp` must be less than or equal to the `end_timestamp` parameter.
- **Cumulative Aggregation**: Transactions are counted cumulatively from the network's inception up to each period boundary.
- **Periodization**: The cumulative totals are calculated for each period (day, week, month, quarter, or year) within the requested time window.

The result is a rolling total that represents the all-time cumulative count of transactions as of each period's end date.

### Transaction Type Categories

Similar to new transactions, total transactions are categorized by service type based on their transaction type IDs:

#### Crypto Transactions (`total_crypto_transactions`)

Cryptocurrency-related operations including account management and HBAR transfers.

**Type IDs**: 10, 11, 12, 13, 14, 15, 48, 49

These types include:

- Account creation and updates
- Cryptocurrency transfers
- Account deletion
- System operations

#### HCS (Hedera Consensus Service) Transactions (`total_hcs_transactions`)

Operations related to consensus topics for decentralized ordering of messages.

**Type IDs**: 24, 25, 26, 27

These types include:

- Topic creation
- Topic updates
- Topic deletion
- Message submission to topics

#### HFS (Hedera File Service) Transactions (`total_hfs_transactions`)

File storage and management operations on the Hedera network.

**Type IDs**: 16, 17, 18, 19

These types include:

- File creation
- File append operations
- File updates
- File deletion

#### HSCS (Hedera Smart Contract Service) Transactions (`total_hscs_transactions`)

Smart contract deployment and interaction operations.

**Type IDs**: 7, 8, 9, 22, 50

These types include:

- Contract creation
- Contract calls
- Contract updates
- Contract deletion
- Ethereum transactions

#### HTS (Hedera Token Service) Transactions (`total_hts_transactions`)

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

#### Other Transactions (`total_other_transactions`)

Miscellaneous operations not falling into the above categories.

**Type IDs**: 20, 21, 23, 28, 42, 43, 44, 51, 52, 54, 55, 56, 65

These types include:

- System administration operations
- Network management transactions
- Schedule operations
- Network node operations
- Utility transactions

### Cumulative Calculation Methodology

For each transaction category, the function:

1. Filters all historical transactions by the appropriate type IDs up to the end timestamp
2. Groups transactions by the specified period (day, week, month, etc.)
3. Counts transactions in each period
4. Calculates a cumulative sum using a window function that adds all previous periods to get the running total
5. Returns the cumulative total along with an integer range representing the period boundaries

The cumulative nature means each period's value includes all transactions from the network's beginning up to that period's end.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch current total transactions (all types, latest day)

```graphql
query TotalTransactionsLatest {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Fetch monthly total crypto transactions for 1 year (timeseries)

```graphql
query TotalCryptoTransactionsMonthly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_crypto_transactions"}, period: {_eq: "month"}}
  ) {
    total
    end_date
  }
}
```

### Fetch quarterly total HTS transactions for 2 years (timeseries)

```graphql
query TotalHTSTransactionsQuarterly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8
    where: {name: {_eq: "total_hts_transactions"}, period: {_eq: "quarter"}}
  ) {
    total
    end_date
  }
}
```

### Fetch weekly total smart contract transactions for 3 months

```graphql
query TotalHSCSTransactionsWeekly {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 12
    where: {name: {_eq: "total_hscs_transactions"}, period: {_eq: "week"}}
  ) {
    total
    end_date
  }
}
```

### Compare cumulative totals for all transaction types (latest)

```graphql
query CompareTotalTransactionTypes {
  all: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  crypto: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_crypto_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  hts: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_hts_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
  hscs: ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 1
    where: {name: {_eq: "total_hscs_transactions"}, period: {_eq: "day"}}
  ) {
    total
    end_date
  }
}
```

### Track network growth with yearly totals

```graphql
query NetworkGrowthYearly {
  ecosystem_metric(
    order_by: {end_date: asc}
    where: {name: {_eq: "total_transactions"}, period: {_eq: "year"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL functions that calculate the **Total Transactions** statistics outlined in this methodology.

SQL Functions:

- `ecosystem.total_transactions` - Cumulative total of all transactions
- `ecosystem.total_crypto_transactions` - Cumulative total of cryptocurrency transfer transactions
- `ecosystem.total_hcs_transactions` - Cumulative total of Hedera Consensus Service transactions
- `ecosystem.total_hfs_transactions` - Cumulative total of Hedera File Service transactions
- `ecosystem.total_hscs_transactions` - Cumulative total of Hedera Smart Contract Service transactions
- `ecosystem.total_hts_transactions` - Cumulative total of Hedera Token Service transactions
- `ecosystem.total_other_transactions` - Cumulative total of miscellaneous/other transactions

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node