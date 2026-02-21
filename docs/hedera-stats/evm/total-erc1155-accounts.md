---
sidebar_position: 4
title: Total ERC-1155 Accounts
---

# Total ERC-1155 Accounts: Multi-Token Standard Holders

## Overview
The Total ERC-1155 Accounts statistic tracks the cumulative number of unique accounts holding ERC-1155 (multi-token standard) tokens on the Hedera network. This metric provides insights into the adoption of multi-token contracts by monitoring rolling totals of unique token holders over time.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`total_erc1155_accounts`**

## Methodology

- **Data Source:** Hedera mirror node contract logs
- **Event Tracking:** 
  - Monitors `TransferSingle` events (topic: `0xc3d58168c5ae7397731d063d5bbf3d657854427343f4c083240f7aacaa2d0f62`)
  - Monitors `TransferBatch` events (topic: `0x4a39dc06d4c0dbc64b70af90fd698a233a518aa5d07e595d983b8c0526c8f7fb`)
- **Holder Identification:** Extracts the recipient address from event topic3 (bytea encoding with variable length support)
- **Aggregation:**
  - Identifies first receipt timestamp for each unique holder address
  - Computes rolling totals per period (hour, day, week, month, quarter, year)
  - Baseline includes all holders from before the time window
- **Exclusions:**
  - Zero address (`0x0000000000000000000000000000000000000000`) excluded (mints/burns)
  - Addresses that later transfer away all tokens are still included in the cumulative count

## Data Representation

Each period represents the cumulative total of unique accounts that have ever received ERC-1155 tokens as of the period end. This metric demonstrates growing adoption of multi-token standards on Hedera.

```
Period Start | Period End | Total Accounts
---|---|---
2025-11-01 | 2025-11-08 | 469
2025-11-08 | 2025-11-15 | 470
2025-11-15 | 2025-11-22 | 472
2025-11-22 | 2025-11-29 | 473
2025-11-29 | 2025-12-06 | 474
```

## Additional Notes

- ERC-1155 is the multi-token standard that allows contracts to issue both fungible (ERC-20 like) and non-fungible (ERC-721 like) tokens from a single contract
- This metric provides a cumulative view of unique holders
- The account count represents unique addresses that have received tokens; the count is preserved even if accounts later transfer away all holdings
- Data is continuously updated via automated pg_cron jobs at various granularities (hour, day, week, month, quarter, year)
- This metric integrates seamlessly with Hedera's existing token analytics infrastructure

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch weekly total ERC-1155 accounts (last 12 weeks)

```graphql
query ERC1155WeeklyTotals {
  metric: ecosystem_metric(
    where: {name: {_eq: "total_erc1155_accounts"}, period: {_eq: "week"}}
    order_by: {end_date: desc_nulls_last}
    limit: 12
  ) {
    total
    start_date
    end_date
  }
}
```

### Fetch daily total ERC-1155 accounts (last 30 days)

```graphql
query ERC1155DailyTotals {
  metric: ecosystem_metric(
    where: {name: {_eq: "total_erc1155_accounts"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 30
  ) {
    total
    start_date
    end_date
  }
}
```

### Fetch monthly total ERC-1155 accounts (full history)

```graphql
query ERC1155MonthlyTotals {
  metric: ecosystem_metric(
    where: {name: {_eq: "total_erc1155_accounts"}, period: {_eq: "month"}}
    order_by: {start_date: asc}
  ) {
    total
    start_date
    end_date
  }
}
```

### Calculate ERC-1155 adoption growth (month-over-month)

```graphql
query ERC1155GrowthMetrics {
  current_month: ecosystem_metric(
    where: {name: {_eq: "total_erc1155_accounts"}, period: {_eq: "month"}}
    order_by: {start_date: desc}
    limit: 1
  ) {
    total
    start_date
  }
  previous_month: ecosystem_metric(
    where: {name: {_eq: "total_erc1155_accounts"}, period: {_eq: "month"}}
    order_by: {start_date: desc}
    limit: 1
    offset: 1
  ) {
    total
    start_date
  }
}
```

## Available Time Periods

The `period` field supports the following values:

- `hour` - Hourly aggregated data
- `day` - Daily aggregated data
- `week` - Weekly aggregated data
- `month` - Monthly aggregated data
- `quarter` - Quarterly aggregated data
- `year` - Yearly aggregated data

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Total ERC-1155 Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.total_erc1155_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Related Metrics

- [Total Smart Contracts](/hedera-stats/evm/total-smart-contracts) - All deployed smart contracts
- [Active Smart Contracts](/hedera-stats/evm/active-smart-contracts) - Smart contracts invoked during a period
- [New Smart Contracts](/hedera-stats/evm/new-smart-contracts) - Contracts deployed during a period

## Dependencies
* Hedera mirror node with contract_log table
* ERC-1155 event signatures (TransferSingle, TransferBatch)
