---
sidebar_position: 16
---

# Transaction Volume

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

## Overview
The Transaction Volume metric measures the total number of transactions processed on the Hedera network over time, categorized by different services. This metric provides insight into network activity, adoption trends, and the usage of various services within the Hedera ecosystem.

:::note Timeframes
Hgraph calculates `hedera_stats_transaction_volume` every 1 hour.
:::

## Methodology
- **Data Source:** Transaction data is collected from the Hedera network.
- **Aggregation:**
  - Transactions are categorized by service type (Crypto, HTS, HSCS, HCS, HFS).
  - Data is grouped by the selected period (e.g., hourly, daily, weekly, monthly).
  - Total transaction volume per service is recorded for each period.

## Data Representation
Each period represents the total number of transactions for each service type on the Hedera network. This metric helps analyze trends in network utilization and service adoption over time.

## Additional Notes
- Transaction Volume is a key metric for assessing network scalability and user adoption.
- Future enhancements may include breakdowns by transaction fee volume, average transaction size, and historical trend analysis.

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