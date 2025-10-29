---
sidebar_position: 4
title: Examples & Use Cases
description: Real-world examples and prompts for the Hgraph MCP Server
keywords: [MCP examples, Hedera queries, blockchain prompts, use cases]
---

# Examples & Use Cases

Discover what's possible with the Hgraph MCP Server through real-world examples and use cases.

## Quick Start - Try Your First Query

Once your MCP connector is configured, test the connection with this query:

**"Could you provide an overview of token 0.0.1055459?"**

<details>
<summary>What should I see if it's working?</summary>

When your MCP is working correctly, you'll see:

1. Your AI assistant (Claude or ChatGPT) will indicate it's using the Hgraph connector/tools
2. You'll receive real Hedera token data in the response
3. The response will include specific details about the token (name, symbol, supply, etc.)

**Success indicator:** You see real, current Hedera token data with specific numbers and details.

**If not working:** You see generic information or an error message. Check the troubleshooting sections in your setup guide ([Claude](/mcp-server/setup-claude#troubleshooting) | [ChatGPT](/mcp-server/setup-chatgpt#troubleshooting)).

</details>

If successful, you'll see Hedera blockchain data returned directly in your chat. This confirms your MCP is working correctly!

## Prompt Examples

### Analyst: Monthly Reporting in Claude Desktop

**Prompt:** "Generate a monthly report showing key Hedera network metrics. Provide this as a document/artifact."

*The MCP server will query multiple data sources, aggregate metrics, and return formatted results ready for your reports.*

### Developer: Token Discovery in Claude Code

**Prompt:** "Get the 5 latest ERC-20 tokens on Hedera with a metadata reliability score of 0.75 or greater"

*Perfect for exploring new tokens, analyzing deployment patterns, and filtering by quality metrics with precise queries.*

### Hedera Enthusiast: Portfolio Analysis on ChatGPT Mobile

**Prompt:** "Please give me a portfolio breakdown of fungible and non-fungible tokens for account 0.0.XYZ and recent transfer activity."

*Check your portfolio, track NFT collections, and monitor account activity from anywhere.*

## More Ideas to Explore

Discover token analytics and holder distributions, analyze NFT collection metrics and transfer patterns, monitor transaction volumes and fee trends, investigate smart contract calls and gas usage, track DeFi metrics and liquidity pools, explore HCS topic message activity, or identify unusual network patterns and behaviors.

## Tips for Better Results

When using the Hgraph MCP Server, remember to:

- **Be specific with entity IDs**: Use the format `0.0.XYZ` for accounts, tokens, and contracts
- **Include time ranges**: Specify "today", "past week", "last 30 days" for time-bound queries
- **Request specific formats**: Ask for tables, CSVs, or markdown for structured data
- **Use proper terminology**: "Treasury account", "consensus timestamp", "token association"

For more detailed guidance, see our [comprehensive usage guide](/mcp-server/usage-guide).

## Next Steps

- [Learn Usage Tips & Best Practices →](/mcp-server/usage-guide)
- [Claude Setup Guide →](/mcp-server/setup-claude)
- [ChatGPT Setup Guide →](/mcp-server/setup-chatgpt)

---

*Have a great use case to share? Join our [Discord community](https://discord.gg/dwxpRHHVWX) and let us know!*