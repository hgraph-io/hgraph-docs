---
sidebar_position: 2
title: Average Network Fee
---

# Average Network Fee

The average network fee measures the mean transaction fee charged across all fee-bearing transactions on the Hedera mainnet for a given time period. This metric provides insight into the typical cost of transacting on the network, complementing the [Network Revenue](/hedera-stats/network-performance/revenue) metric which tracks total fee volume.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`avg_network_fee`**

## Methodology

### Definition

The average network fee is calculated by taking the arithmetic mean of `charged_tx_fee` across all qualifying transactions within each time period. The result is returned in tinybars as a whole number (truncated via integer casting).

```text
Average Network Fee = SUM(charged_tx_fee) / COUNT(transactions)
                      where charged_tx_fee > 0
```

Transactions are grouped into time periods using `date_trunc` (e.g., truncating timestamps to the nearest hour or day), and the average is computed independently for each period.

### Inclusion and Exclusion Criteria

**Included:** All transactions on the Hedera mainnet where `charged_tx_fee > 0`.

**Excluded:** Transactions with a zero fee (`charged_tx_fee = 0`). These are filtered out because they represent operations that do not incur a standard transaction fee, such as:

- **System transactions** generated internally by the network (e.g., record file updates, address book updates)
- **Node stake reward payouts** and other automated network operations
- **Certain administrative transactions** that are exempt from fees

Including zero-fee transactions would artificially deflate the average, misrepresenting the actual cost users pay to transact on the network.

## Additional Notes

- **Outlier sensitivity:** The average is influenced by high-fee transactions such as large smart contract calls. Individual transaction fees can exceed 17 HBAR, while the typical average sits around 0.026 HBAR (~2.6M tinybars). The median fee may differ significantly from the mean.
- **Relationship to Network Revenue:** The [Network Revenue](/hedera-stats/network-performance/revenue) metric (`network_fee`) sums all fees to measure total revenue, while this metric averages them to measure per-transaction cost. Together they provide a complete picture of fee activity on the network.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

> **Note:** The results for `total` are stored in `tinybar` (divide by `100,000,000`).

### Fetch most recent average network fee

```graphql
query RecentAvgNetworkFee {
  ecosystem_metric(
    where: {name: {_eq: "avg_network_fee"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    start_date
    end_date
  }
}
```

### Fetch hourly average network fee (timeseries)

```graphql
query HourlyAvgNetworkFee {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 720
    where: {name: {_eq: "avg_network_fee"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### 7 day percentage change (period comparison)

```graphql
query AvgNetworkFeeChange7Days {
  current: ecosystem_metric_aggregate(
    where: {name: {_eq: "avg_network_fee"}, period: {_eq: "hour"}}
    order_by: {start_date: desc_nulls_last}
    limit: 168
  ) {
    aggregate {
      avg {
        total
      }
    }
  }
  previous: ecosystem_metric_aggregate(
    where: {name: {_eq: "avg_network_fee"}, period: {_eq: "hour"}}
    order_by: {start_date: desc_nulls_last}
    offset: 168
    limit: 168
  ) {
    aggregate {
      avg {
        total
      }
    }
  }
}
```

> **Note:** Percent Change = ((current - previous) / previous) * 100

### Fetch average network fee in USD

```graphql
query AvgNetworkFeeUSD {
  avg_fee: ecosystem_metric(
    where: {name: {_eq: "avg_network_fee"}, period: {_eq: "hour"}}
    order_by: {end_date: desc_nulls_last}
    limit: 720
  ) {
    total
    end_date
  }
  hbar: ecosystem_metric(
    where: {name: {_eq: "avg_usd_conversion"}, period: {_eq: "hour"}}
    order_by: {end_date: desc_nulls_last}
    limit: 720
  ) {
    total
    end_date
  }
}
```

> **Note:** Divide `avg_network_fee` by `100,000,000` and `avg_usd_conversion` by `100,000`, then multiply the results to get the average fee in USD. Example: `avg_network_fee = 2632576` (0.02632576 HBAR) and `avg_usd_conversion = 18215` ($0.18215) gives **$0.0048**.

## Available Time Periods

The `period` field supports the following values:

- `hour`
- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Average Network Fee** statistic outlined in this methodology.

SQL Function: `ecosystem.avg_network_fee`

**[View GitHub Repository ->](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
