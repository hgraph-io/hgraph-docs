---
sidebar_position: 16
---

# Transaction Volume

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

## Overview
The Transaction Volume metric measures the total number of transactions processed on the Hedera network over time, categorized by different services. This metric provides insight into network activity, adoption trends, and the usage of various services within the Hedera ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
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

### SQL Code

This is the SQL code required to run these calculations.

```
WILL BE ADDED SOON
```

## Dependencies
* Hedera mirror node