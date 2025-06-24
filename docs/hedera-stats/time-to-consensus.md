---
sidebar_position: 8
title: Time to Consensus
---

# Network Time to Consensus

Below is a methodology based on the SecC2RC metric, which stands for measuring the elapsed time from when a transaction reaches consensus until its corresponding record is created and available. In practice, this statistic is used as a proxy for "time to consensus" or "network latency" on the Hedera network.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

:::info Incremental update setup
This Hedera Stat requires Prometheus and access to Hedera telemetry data. Please refer to the [installation guide](installation) for more information.
:::

Hedera Stat Name: **`avg_time_to_consensus`**

## Methodology

### Identify the Relevant Timestamps:

    - **Consensus Timestamp:** This is the timestamp assigned to a transaction at the moment the network finalizes its order and deems the transaction valid. This timestamp comes from the consensus layer of the Hedera network.
    - **Record Creation Timestamp:** After consensus is achieved, a transaction record is generated that details the outcome of the transaction (e.g., success, cost, updated balances). The time at which this final record is fully formed and made available is the Record Creation Timestamp.

### Data Source for Timestamps:

    - The SecC2RC (Seconds from Consensus to Record Creation) metric is derived from Hedera network telemetry data.
    - Consensus timestamps are obtained from the consensus topic stream or from the transaction's consensus status in the mirror node database.
    - Record creation timestamps are obtained from the same data source once the mirror node has received and processed the finalized transaction record.

### Calculating the Metric:

The basic formula is:

```
Time to Consensus (SecC2RC) = Record Creation Timestamp - Consensus Timestamp
```

Both timestamps should be expressed in a common unit (e.g., seconds since epoch) to allow for a straightforward subtraction.

### Aggregation and Reporting:

Once the difference is calculated for individual transactions, these values are:

- Averaged over a 24 hour time window to provide a stable metric.
- Indexed for querying via Hgraph's GraphQL API

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch most recent network time to consensus (hour)

```graphql
query GetRecentNetworkTTC {
  ecosystem_metric(
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "hour"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch hourly average TTC (timeseries)

```graphql
query HourlyNetworkTTC {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### 7 day percentage change (period comparison)

```graphql
query TTC7DayChange {
  current: ecosystem_metric_aggregate(
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "hour"}}
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
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "hour"}}
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

## Available Time Periods

The `period` field supports the following values:

- `hour`
- `day`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Time to Consensus** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_avg_time_to_consensus`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node
* Prometheus (**[see installation](installation)**)