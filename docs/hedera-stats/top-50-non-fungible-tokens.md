---
sidebar_position: 10
---

# Top 50 Non-Fungible Tokens

## Overview  
This metric focuses on collections of non-fungible tokens (NFTs) rather than individual serialized tokens. It evaluates sales and transaction data to showcase the most active and valuable collections in the Hedera ecosystem.  

:::note Timeframes
Hgraph calculates `hedera_stats_top_50_non-fungible-tokens` every 24 hours with a 72-hour rolling average applied for smoothing.
:::

## Methodology  

### Inclusion Criteria  
1. **Normalized Volume**:  
   - Total HBAR value of all NFT sales within a specific collection over the evaluation period.  
   - Data sourced from Hedera marketplaces like Kabila and SentX.  

2. **Normalized Transactions**:  
   - Total transactions involving the collection, including sales, transfers, and burns. 

*Normalization ensures that all values are scaled between 0 and 1 to make them comparable across non fungible tokens.* 

### Exclusion Criteria  
- Collections with an unusually high number of transactions or sales volume from a small group of accounts.  

*Note: We use a 72-hour rolling average because NFTs are traditionally more volatile.*

### Ranking Formula  
```
Composite Score = (Normalized Volume * 0.6) + (Normalized Transactions * 0.4)
```

#### Rationale

1. **Sales Volume (60%)**: Reflects the monetary value and demand for a collection. Weighted higher as it indicates a collection's market impact.

2. **Transaction Count (40%)**: Measures engagement and liquidity. Ensures collections with high activity but lower monetary value are recognized.

### **Purpose**
This balanced approach highlights collections that combine market value with active community engagement, ensuring fair and meaningful rankings for the ecosystem.

### Data Sources  
- Sales and transaction data from Hedera marketplaces (e.g., Kabila, SentX).  
- Additional transaction data from Hedera Mirror Nodes.    

## Code examples

```
some code example here
```