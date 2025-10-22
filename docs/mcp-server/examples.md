---
sidebar_position: 4
title: Examples & Use Cases
description: Real-world examples and prompts for the Hgraph MCP Server
keywords: [MCP examples, Hedera queries, blockchain prompts, use cases]
---

# Examples & Use Cases

Discover what's possible with the Hgraph MCP Server through real-world examples and use cases.

## Quick Start - Try Your First Query

Once your MCP connector is configured, test the connection with this simple query:

**"What is the current total supply of HBAR?"**

If successful, you'll see Hedera network data returned directly in your chat. This confirms your MCP is working correctly!

## Featured Examples

### 📊 Analyst: Monthly Reporting

**Use Case:** Generate comprehensive network reports for stakeholders

**Prompt:**
```
Generate a monthly report showing key Hedera network metrics.
Provide this as a document/artifact.
```

*The MCP server will query multiple data sources, aggregate metrics, and return formatted results ready for your reports.*

**Try these variations:**
- "Show me transaction volume trends for the past 30 days"
- "What were the top 10 most active accounts this month?"
- "Generate a DeFi ecosystem report with TVL and trading volumes"

### 🔍 Developer: Token Discovery

**Use Case:** Find and analyze new tokens on the network

**Prompt:**
```
Get the 5 latest ERC-20 tokens on Hedera with a metadata
reliability score of 0.75 or greater
```

*Perfect for exploring new tokens, analyzing deployment patterns, and filtering by quality metrics with precise queries.*

**Try these variations:**
- "Show me all NFT collections deployed in the last week"
- "Find tokens with more than 1000 holders"
- "List smart contracts deployed by account 0.0.XYZ"

### 💼 Hedera Enthusiast: Portfolio Analysis

**Use Case:** Track and analyze your holdings

**Prompt:**
```
Please give me a portfolio breakdown of fungible and non-fungible
tokens for account 0.0.XYZ and recent transfer activity.
```

*Check your portfolio, track NFT collections, and monitor account activity from anywhere.*

**Try these variations:**
- "What's my account's transaction history for the past 7 days?"
- "Show me all NFTs owned by account 0.0.XYZ"
- "Calculate the total USD value of tokens in account 0.0.XYZ"

## More Prompt Ideas

### Network Metrics
- "What is the current TPS (transactions per second) on Hedera?"
- "Show me the total value locked (TVL) in Hedera DeFi"
- "How many new accounts were created today?"
- "What are the current network fees?"

### Token Analytics
- "What are the top 10 tokens by market cap?"
- "Show me USDC transfer volume over the past week"
- "Find all token pairs on SaucerSwap DEX"
- "What's the circulating supply of HBARX?"

### NFT Exploration
- "List the most active NFT collections by transfer count"
- "Show me floor prices for the top NFT collections"
- "Find all NFTs created by a specific account"
- "What NFT collections have launched this month?"

### Transaction Analysis
- "Show me the largest HBAR transfers today"
- "Find failed transactions in the last hour"
- "What contracts consumed the most gas this week?"
- "List all transactions from treasury account 0.0.2"

### Smart Contract Queries
- "What's the bytecode size of contract 0.0.XYZ?"
- "Show me all contracts deployed by Hedera ecosystem projects"
- "Find contracts that implement ERC-721 standard"
- "What are the most called contract functions today?"

### DeFi Metrics
- "Show me liquidity pool statistics for HBAR/USDC"
- "What's the 24-hour trading volume on HeliSwap?"
- "Find the yield farming APRs across all protocols"
- "Show me lending protocol statistics"

### Historical Analysis
- "Compare this month's transaction volume to last month"
- "Show me HBAR price movement over the past year"
- "What was the highest TPS ever recorded on Hedera?"
- "Track account 0.0.XYZ balance changes over time"

## Advanced Query Patterns

### Combining Multiple Data Points
```
Show me the top 5 accounts by HBAR balance,
then display their token holdings and recent transactions
```

### Time-Series Analysis
```
Create a weekly breakdown of network fees collected
for the past 3 months, formatted as a table
```

### Cross-Reference Queries
```
Find all accounts that hold both USDC and HBARX tokens,
sorted by total portfolio value
```

### Filtered Aggregations
```
Calculate the total NFT trading volume for collections
with more than 100 unique holders
```

## Tips for Better Results

1. **Be specific with entity IDs**: Use the format `0.0.XYZ` for accounts, tokens, and contracts
2. **Include time ranges**: Specify "today", "past week", "last 30 days" for time-bound queries
3. **Request specific formats**: Ask for tables, CSVs, or markdown for structured data
4. **Use proper terminology**: "Treasury account", "consensus timestamp", "token association"
5. **Chain queries logically**: Start broad, then narrow down with follow-up questions

## Integration Ideas

### Automated Reporting
Set up recurring prompts to generate daily/weekly reports on key metrics.

### Portfolio Tracking
Create a standardized prompt template for checking multiple accounts.

### Market Analysis
Combine multiple data points to identify trends and opportunities.

### Audit & Compliance
Use historical queries to track fund movements and verify transactions.

## Next Steps

- [Learn Usage Tips & Best Practices →](./usage-guide)
- [Claude Setup Guide →](./setup-claude)
- [ChatGPT Setup Guide →](./setup-chatgpt)

---

*Have a great use case to share? Join our [Discord community](https://discord.gg/dwxpRHHVWX) and let us know!*