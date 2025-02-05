---
sidebar_position: 2
---

# Time to consensus

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

Below is a methodology based on the SecC2RC metric, which stands for measuring the elapsed time from when a transaction reaches consensus until its corresponding record is created and available. In practice, this statistic is used as a proxy for "time to consensus" or "network latency" on the Hedera network.

:::note Timeframes
Hgraph calculates `hedera_stats_ttc` every 5 minutes.
:::

## Methodology

### Identify the Relevant Timestamps:

    - **Consensus Timestamp (C):** This is the timestamp assigned to a transaction at the moment the network finalizes its order and deems the transaction valid. This timestamp comes from the consensus layer of the Hedera network.
    - **Record Creation Timestamp (RC):** After consensus is achieved, a transaction record is generated that details the outcome of the transaction (e.g., success, cost, updated balances). The time at which this final record is fully formed and made available is the Record Creation Timestamp.

### Data Source for Timestamps:

    - The SecC2RC (Seconds from Consensus to Record Creation) metric is derived from Hedera network telemetry data.
    - Consensus timestamps are obtained from the consensus topic stream or from the transaction's consensus status in the mirror node database.
    - Record creation timestamps are obtained from the same data source once the mirror node has received and processed the finalized transaction record.

### Calculating the Metric:

The basic formula is:

```
Time to Consensus (SecC2RC) = Record Creation Timestamp (RC) - Consensus Timestamp (C)
```

Both timestamps should be expressed in a common unit (e.g., seconds since epoch) to allow for a straightforward subtraction.

### Aggregation and Reporting:

Once the difference is calculated for individual transactions, these values are:

- Averaged over a 24 hour time window to provide a stable metric.
- Indexed for querying via Hgraph's GraphQL API

## Hgraph API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Code & Examples

The following code examples will allow you to perform these calculations and test retrieving data via our GraphQL API.

### SQL Code

This is the SQL code required to run these calculations.

```
WILL BE ADDED SOON
```

### GraphQL Example Query

This is a GraphQL API query that can be tested using our console.

```
WILL BE ADDED SOON
```

## Dependancies
* Hedera mirror node