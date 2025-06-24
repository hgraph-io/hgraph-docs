---
sidebar_position: 7
title: Transactions Per Second
---

# Transactions Per Second (TPS)

## Overview
Transactions Per Second (TPS) measures the number of transactions processed by the Hedera network within a given period. This metric provides insights into network activity, scalability, and overall transaction throughput.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`network_tps`**

## Methodology
- **Where the Data Comes From:**  
  Every transaction on the Hedera network gets a timestamp showing the exact moment the network agreed it happened. These timestamps are like a logbook of everything the network does.

- **How We Crunch the Numbers:**  
  - We group transactions into chunks of time—like days, hours, or minutes—based on when they took place. For example, if we pick "days," we lump together all transactions from midnight to midnight UTC (a universal time standard).  
  - For each chunk of time, we count up all the transactions that happened between a chosen start and end time.  
  - To figure out the TPS, we take that total number of transactions and divide it by the number of seconds in that chunk. For a full day, that’s 86,400 seconds (since a day has that many seconds).  
  - Each TPS number gets tied to a time range that starts at the beginning of its chunk and ends right before the next chunk begins.  
  - Finally, we round the TPS down to the nearest whole number (no decimals) and show it alongside its time range.

## Data Representation
The TPS info comes as a list where each entry has:  
- A time range with a start and end time (measured in nanoseconds since January 1, 1970).  
- A whole number showing the average TPS for that time range, worked out by dividing the total transactions by the chunk’s full seconds and rounding down.

## Additional Notes
- Time chunks are based on UTC, so a "day" kicks off at 00:00:00 UTC.  
- If the start and end times you pick don’t cover a full chunk, we still use the whole chunk’s seconds to calculate TPS. This can make the TPS look a bit lower for incomplete chunks.  
- You can zoom in on specific time ranges by picking your own start and end times, measured in nanoseconds.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch most recent network TPS

```graphql
query GetRecentNetworkTPS {
  ecosystem_metric(
    where: {name: {_eq: "network_tps"}}
    order_by: {end_date: desc_nulls_last}
    limit: 1
  ) {
    total
    end_date
  }
}
```

### Fetch hourly average TPS (timeseries)

```graphql
query HourlyNetworkTPS {
  ecosystem_metric(
    order_by: {end_date: desc_nulls_last}
    limit: 8760
    where: {name: {_eq: "network_tps"}, period: {_eq: "hour"}}
  ) {
    total
    end_date
  }
}
```

### 7 day percentage change (period comparison)

```graphql
query TPS7DayAvgChange {
  current: ecosystem_metric_aggregate(
    where: {name: {_eq: "network_tps"}, period: {_eq: "hour"}}
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
    where: {name: {_eq: "network_tps"}, period: {_eq: "hour"}}
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

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Transactions Per Second** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_network_tps`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
