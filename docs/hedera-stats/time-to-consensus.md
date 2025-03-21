---
sidebar_position: 2
---

# Time to Consensus

Below is a methodology based on the SecC2RC metric, which stands for measuring the elapsed time from when a transaction reaches consensus until its corresponding record is created and available. In practice, this statistic is used as a proxy for "time to consensus" or "network latency" on the Hedera network.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

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

## Dependencies
- Hedera mirror node
- Hedera telemetry data

### **Fetching Time to Consensus via GraphQL**
To retrieve the average time to consensus on March 1st 2025, use the following query:

```graphql
query AvgTimeToConsensus {
  ecosystem_metric_aggregate(
    where: {
      name: { _eq: "avg_time_to_consensus" },
      period: { _eq: "hour" },
      start_date: { _gte: "2025-03-01T00:00:00", _lte: "2025-03-02T00:00:00" }
    }
  ) {
    aggregate {
      avg {
        total
      }
    }
  }
}
```

The result will be in nanoseconds.

---

## Incremental update setup

### 1. Install prometheus to use promtool cli

This downloads the Prometheus archive, extracts it, and copies the promtool binary to your `PATH` for easy command-line access.

```bash
curl -L -O https://github.com/prometheus/prometheus/releases/download/v3.1.0/prometheus-3.1.0.linux-amd64.tar.gz
tar -xvf prometheus-3.1.0.linux-amd64.tar.gz
# one way to add the tool to the PATH
cp prometheus-3.1.0.linux-amd64/promtool /usr/bin
```

### 2. Add a cron job

This opens your `crontab` to schedule a job that runs a script every hour and logs its output for monitoring purposes.

```bash
crontab -e
1 * * * * cd /path/to/hedera-stats/src/time-to-consensus && bash ./run.sh >> ./.raw/cron.log 2>&1
```

[View the GitHub repository](https://github.com/hgraph-io/hedera-stats) for more information.