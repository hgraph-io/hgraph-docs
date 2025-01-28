---
sidebar_position: 9
---

# Top 50 Fungible Tokens

## Overview  
This metric highlights the most significant fungible tokens in the Hedera ecosystem. Rankings are based on market activity, volume, and token utility, aiming to balance accuracy with transparency.  

:::note Timeframes
Hgraph calculates `hedera_stats_top_50_fungible-tokens` every 24 hours, with a 48-hour rolling average applied for smoothing.
:::

## Methodology  

### Inclusion Criteria  
1. **Normalized Market Cap**:  
   - Calculated as the product of circulating supply and token price.  
   - Prices sourced from DeFi platforms such as SaucerSwap and DeFi Llama.  

2. **Normalized Volume**:  
   - Aggregated daily trading volume for each token across supported exchanges.  

3. **Normalized Transactions**:  
   - Total transactions involving the token, including transfers, mints, and burns.  

*Normalization ensures that all values are scaled between 0 and 1 to make them comparable across fungible tokens.*

### Exclusion Criteria  
- Tokens with inflated market caps due to low liquidity.  

### Ranking Formula  

```
Composite Score = (Normalized Market Cap * 0.4) + (Normalized Volume * 0.4) + (Normalized Transactions * 0.2)
```

#### Rationale:

1. **Normalized Market Cap (40%)**: Reflects overall token value. Weighted lower to avoid overemphasis on tokens with inflated supply or speculative pricing.  

2. **Normalized Volume (40%)**: Indicates liquidity and trading activity, ensuring active demand for the token. Equal weight with market cap emphasizes dynamic usage.  

3. **Normalized Transactions (20%)**: Measures community engagement and utility. Weighted lower to mitigate spammy or artificially inflated activity.  

#### Purpose:  
Balances long-term value (market cap) with real-time activity (volume, transactions) while minimizing manipulation. The formula ensures fair representation of impactful tokens in the Hedera ecosystem.

### Data Sources  
- Hedera Mirror Node data for token transactions.  
- Pricing data from SaucerSwap, DeFi Llama, and other DeFi platforms. 

## Code examples

```
some code example here
```