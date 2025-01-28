---
sidebar_position: 8
---

# Top 50 Contracts

## Overview  
The primary goal of this metric is to provide insights into the most heavily utilized or impactful smart contracts on the Hedera network. It evaluates both transaction volume and the diversity of interactions, ensuring that rankings highlight genuine usage while minimizing the effects of artificial inflation or spam.  

:::note Timeframes
Hgraph calculates `hedera_stats_top_50_contracts` every 24 hours with smoothing applied using a 48-hour rolling average to filter out short-term anomalies.
:::

## Methodology  

### Inclusion Criteria  
1. **Normalized Contract Calls**:  
   - All transactions interacting with a smart contract via a `CONTRACTCALL` or similar Hedera Token Service interaction.  
   - Includes both successful and failed transactions.  

2. **Normalized Unique Callers**:  
   - Measures how many distinct accounts (wallets or entities) interact with the contract.  
   - Helps reduce the impact of single wallets or bots inflating usage metrics.

*Normalization ensures that all values are scaled between 0 and 1 to make them comparable across contracts.*

### Exclusion Criteria  
- Contracts where the majority of interactions (>90%) originate from a single wallet or small set of wallets, as these are likely attempts to manipulate rankings.  

### Ranking Formula  
To calculate the rankings:  
1. Weight `Normalized Contract Calls` and `Normalized Unique Callers` equally.  
2. Normalize and aggregate both metrics to assign a composite score.  
  
```
Composite Score = (Normalized Contract Calls * 0.5) + (Normalized Unique Callers * 0.5)
```

#### Components:
1. **Normalized Contract Calls**: Measures the total interactions with a contract, reflecting its overall usage.
2. **Normalized Unique Callers**: Tracks the number of unique accounts interacting with a contract, promoting authenticity.

#### Rationale:
- Equal weighting ensures both raw usage and diverse participation are valued equally.
- Caller diversity minimizes rankings being skewed by bots or a few accounts.
- Normalization scales all contracts for fair ranking.
- Rankings refresh daily with a rolling average to filter anomalies.   

## Code examples

```
some code example here
```