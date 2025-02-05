---
sidebar_position: 12
---

# Stablecoin Market Cap

## Overview
The Stablecoin Market Cap metric tracks the total market capitalization of stablecoins circulating on the Hedera network. This metric provides insight into the adoption and liquidity of stablecoins within the ecosystem.

:::note Timeframes
Hgraph calculates `hedera_stats_stablecoin_market_cap` every 1 day.
:::

## Methodology
- **Data Source:** Stablecoin data is retrieved from [DeFiLlama](https://stablecoins.llama.fi/stablecoincharts/Hedera).
- **Aggregation:**
  - Market cap values are extracted from the API response.
  - Timestamps are converted and grouped by the selected period (e.g., daily, weekly, monthly).
  - The **average market cap** is calculated for each period.

## Data Representation
Each period represents the average stablecoin market capitalization recorded within that timeframe. The metric is useful for tracking trends in stablecoin adoption and liquidity over time.

## Additional Notes
- This metric relies on **third-party data from DeFiLlama**, which aggregates stablecoin circulation across various networks.

**Endpoint:** `[Placeholder for API]`

## Code examples

```
some code example here
```