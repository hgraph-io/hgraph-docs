---
sidebar_position: 8
---

# Top 50 Contracts

## Overview  
The primary goal of this metric is to provide insights into the most heavily utilized or impactful smart contracts on the Hedera network. It evaluates both transaction volume and the diversity of interactions, ensuring that rankings highlight genuine usage while minimizing the effects of artificial inflation or spam.  

## Methodology  

### Inclusion Criteria  
1. **Total Contract Calls**:  
   - All transactions interacting with a smart contract via a `CONTRACTCALL` or similar Hedera Token Service interaction.  
   - Includes both successful and failed transactions.  

2. **Unique Caller Diversity**:  
   - Measures how many distinct accounts (wallets or entities) interact with the contract.  
   - Helps reduce the impact of single wallets or bots inflating usage metrics.  

### Exclusion Criteria  
- Contracts where the majority of interactions (>90%) originate from a single wallet or small set of wallets, as these are likely attempts to manipulate rankings.  

### Ranking Formula  
To calculate the rankings:  
1. Weight `Total Contract Calls` and `Unique Caller Diversity` equally.  
2. Normalize and aggregate both metrics to assign a composite score.  

**Example Formula**:  
\[ Composite Score = (Normalized Contract Calls \times 0.5) + (Normalized Caller Diversity \times 0.5) \]  

### Data Sources  
- Hedera Mirror Node data for contract call counts and unique interacting accounts.  

### Update Frequency  
- Calculated every 24 hours with smoothing applied using a 48-hour rolling average to filter out short-term anomalies or gaming attempts.  