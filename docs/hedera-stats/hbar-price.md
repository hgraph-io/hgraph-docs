---
sidebar_position: 15
---

# HBAR Price

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

## Overview
The HBAR Price statistic provides the latest price of HBAR, aggregated from multiple sources. This statistic is essential for tracking the value of HBAR in real time and analyzing price trends over different timeframes.

:::note Timeframes
Hgraph calculates `hedera_stats_hbar_price` every 1 second.
:::

## Methodology
- **Data Sources:** HBAR price data is retrieved from **CoinMarketCap** (and potentially other market data providers).
- **Aggregation:**
  - Prices from multiple sources may be averaged to provide a more accurate market representation.
  - Data is refreshed periodically to ensure up-to-date pricing information.

## Data Representation
Each period represents the latest available HBAR price at the given timestamp. This metric is useful for tracking price fluctuations and market trends.

## Additional Notes
- HBAR price fluctuations can be influenced by market conditions, trading volume, and broader crypto trends.
- Future enhancements may include price history tracking, moving averages, and volatility analysis.

### SQL Code

This is the SQL code required to run these calculations.

```
WILL BE ADDED SOON
```

## Dependencies
* Hedera mirror node