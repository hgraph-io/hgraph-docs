---
sidebar_position: 11
---

# Total Value Locked (TVL)

## Overview
Total Value Locked (TVL) represents the total amount of assets locked within decentralized finance (DeFi) protocols on the Hedera network. This metric provides insights into liquidity, ecosystem adoption, and capital efficiency within Hedera’s DeFi landscape.

:::note Timeframes
Hgraph calculates `hedera_stats_tvl` every 1 day.
:::

## Methodology
- **Data Source:** TVL data is retrieved from [DeFiLlama](https://api.llama.fi/v2/historicalChainTvl/Hedera).
- **Aggregation:**
  - TVL values are extracted from the API response.
  - Timestamps are converted and grouped by the selected period (e.g., daily, weekly, monthly).
  - The **average TVL** is calculated for each period.

## Data Representation
Each period represents the average total value locked within the Hedera DeFi ecosystem. This metric helps track capital flow trends and adoption over time.

## Additional Notes
- TVL is a key indicator of DeFi activity and liquidity within the Hedera network.
- Future enhancements may include breakdowns by protocol and asset type.

## API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Code examples

```
some code example here
```