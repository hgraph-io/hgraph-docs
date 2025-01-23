---
sidebar_position: 9
---

# Top 50 Fungible Tokens

DRAFT

## Overview  
This metric highlights the most significant fungible tokens in the Hedera ecosystem. Rankings are based on market activity, volume, and token utility, aiming to balance accuracy with transparency.  

## Methodology  

### Inclusion Criteria  
1. **Market Cap**:  
   - Calculated as the product of circulating supply and token price.  
   - Prices sourced from DeFi platforms such as SaucerSwap and DeFi Llama.  

2. **Volume**:  
   - Aggregated daily trading volume for each token across supported exchanges.  

3. **Transaction Count**:  
   - Total transactions involving the token, including transfers, mints, and burns.  

### Exclusion Criteria  
- Tokens with inflated market caps due to low liquidity or artificial demand (flagged via outlier detection).  

### Ranking Formula  
\[ Composite Score = (Normalized Market Cap \times 0.4) + (Normalized Volume \times 0.4) + (Normalized Transaction Count \times 0.2) \]  

### Data Sources  
- Hedera Mirror Node data for token transactions.  
- Pricing data from SaucerSwap, DeFi Llama, and other DeFi platforms.  

### Update Frequency  
- Calculated every 24 hours, with a 48-hour rolling average applied for smoothing. 