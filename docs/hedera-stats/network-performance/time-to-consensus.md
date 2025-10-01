---
sidebar_position: 3
title: Time to Consensus
---

# Network Time to Consensus

This metric measures the SecC2RC (Seconds from Consensus to Record Creation) time, which represents the elapsed time from when a transaction reaches consensus until its corresponding record is created and made available. This statistic serves as a proxy for network post-consensus processing efficiency and overall system latency on the Hedera network.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

:::info Incremental update setup
This Hedera Stat requires Prometheus and access to Hedera telemetry data. Please refer to the [installation guide](installation) for more information.
:::

Hedera Stat Name: **`avg_time_to_consensus`**

## Methodology

### Data Source

The `avg_time_to_consensus` metric is derived from the Hedera network's Prometheus telemetry system, specifically using the `platform_secC2RC{environment="mainnet"}` metric. This provides real-time measurements of the SecC2RC (Seconds from Consensus to Record Creation) timing.

### ETL Pipeline Architecture

The metric collection follows a three-stage ETL (Extract, Transform, Load) pipeline:

1. **Extract**: Queries Prometheus using `promtool` to retrieve `platform_secC2RC` data
2. **Transform**: Processes JSON response to CSV format with proper timestamp handling
3. **Load**: Bulk inserts data into PostgreSQL `ecosystem.metric` table

### Data Processing

#### Time Period Support

- **Hourly**: Collects data every hour using `--step=1h` in Prometheus queries
- **Daily**: Collects daily aggregates using `--step=1d` in Prometheus queries

#### Timestamp Precision

- Maintains Hedera's nanosecond precision by converting Unix timestamps to nanoseconds
- Uses PostgreSQL's `int8range` type for timestamp intervals
- Handles proper time boundary alignment (hour/day boundaries)

#### Calculation Formula

```text
SecC2RC Time = Record Creation Timestamp - Consensus Timestamp
```

The raw Prometheus metric provides this calculation; the ETL pipeline aggregates these values over the specified time periods (hourly or daily averages).

### Automated Collection

Data collection is automated via system cron jobs:

- **Hourly**: Runs every hour to collect recent data
- **Daily**: Runs daily at 00:02 UTC for daily aggregates
- **Backfill**: Supports historical data collection in yearly chunks (2023-2025)

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

### Fetch most recent network time to consensus (day)

```graphql
query GetRecentNetworkTTCDaily {
  ecosystem_metric(
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "day"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch daily average TTC (timeseries)

```graphql
query DailyNetworkTTC {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 365
    where: {name: {_eq: "avg_time_to_consensus"}, period: {_eq: "day"}}
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

## ETL Implementation

The **Time to Consensus** metric is implemented using an ETL pipeline rather than SQL functions. The implementation files are located in the **Hedera Stats** GitHub repository:

**ETL Pipeline Components:**

- **Extract**: `src/time-to-consensus/etl/extract.sh` (hourly) and `src/time-to-consensus/etl/extract_day.sh` (daily)
- **Transform**: `src/time-to-consensus/etl/transform.sh` (hourly) and `src/time-to-consensus/etl/transform_day.sh` (daily)
- **Load**: `src/time-to-consensus/etl/load.sh` and `src/time-to-consensus/etl/load.sql`
- **Orchestration**: `src/time-to-consensus/run.sh` (hourly) and `src/time-to-consensus/run_day.sh` (daily)
- **Documentation**: `src/time-to-consensus/CRON_SETUP.md`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
- Prometheus (**[see installation](installation)**)