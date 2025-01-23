---
sidebar_position: 10
---

# Top 50 Non-Fungible Tokens**

DRAFT

## Overview  
This metric focuses on collections of non-fungible tokens (NFTs) rather than individual serialized tokens. It evaluates sales and transaction data to showcase the most active and valuable collections in the Hedera ecosystem.  

## Methodology  

### Inclusion Criteria  
1. **Sales Volume**:  
   - Total HBAR value of all NFT sales within a specific collection over the evaluation period.  
   - Data sourced from Hedera marketplaces like Kabila and SentX.  

2. **Transaction Count**:  
   - Total transactions involving the collection, including sales, transfers, and burns.  

### Exclusion Criteria  
- Collections with an unusually high number of transactions or sales volume from a small group of accounts, flagged as potential gaming attempts.  

### Ranking Formula  
\[ Composite Score = (Normalized Sales Volume \times 0.6) + (Normalized Transaction Count \times 0.4) \]  

### Data Sources  
- Sales and transaction data from Hedera marketplaces (e.g., Kabila, SentX).  
- Additional transaction data from Hedera Mirror Nodes.  

### Update Frequency  
- Calculated every 24 hours with a 72-hour rolling average applied for smoothing.  