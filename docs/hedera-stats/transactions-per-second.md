---
sidebar_position: 14
---

# Transactions Per Second (TPS)

## Overview
Transactions Per Second (TPS) measures the number of transactions processed by the Hedera network within a given period. This metric provides insights into network activity, scalability, and overall transaction throughput.

:::note Timeframes
Hgraph calculates `hedera_stats_tps` every 1 second.
:::

## Methodology
- **Data Source:** Transactions are retrieved from the Hedera transaction dataset.
- **Filtering:** Users can filter TPS by specific Hedera services (e.g., Crypto Transfers, Smart Contracts, Consensus Submissions, Token Transactions).
- **Aggregation:**
  - Transactions are grouped by the selected period (e.g., second, minute, hour, day).
  - The total transaction count is divided by the number of seconds in the period to compute TPS.

## Data Representation
Each period represents the average number of transactions processed per second within that timeframe. Users can also filter TPS by service type to analyze individual service performance trends and gain insights into network load and scalability.

## Additional Notes
- TPS is a key performance indicator for blockchain networks, showing real-time processing capability.

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
