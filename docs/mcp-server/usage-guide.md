---
sidebar_position: 5
title: Usage Tips & Best Practices
description: Get the most from your Hgraph MCP Server with tips, verification, and safety information
keywords: [MCP usage, best practices, safety, verification, troubleshooting]
---

# Usage Tips & Best Practices

Maximize your experience with the Hgraph MCP Server by following these guidelines and best practices.

:::note Need Help Understanding These Tips?
You can share this page with your AI assistant (Claude or ChatGPT) and ask: "Help me understand these best practices and how to apply them to my Hedera queries."
:::

## Usage Tips

### Be Specific with Your Queries
Use [entity IDs](/mcp-server/examples#tips-for-better-results) (like `0.0.XYZ` for accounts), time ranges, and clear metrics for best results. The more specific your prompt, the more accurate the data.

### Explore the Underlying Queries
Ask the AI to show you the GraphQL or SQL queries it's using. This transparency helps you understand the data and learn query patterns.

### Combine with AI Capabilities
Request charts, dashboards, CSV exports, or markdown tables. The AI can transform raw blockchain data into any format you need.

### Start with Context
The MCP automatically loads essential schemas, but you can ask for additional examples or explore specific data types for deeper insights.

### Follow Prompting Best Practices
For optimal results, refer to platform-specific guides:
- [Claude's prompting guide](https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview)
- [OpenAI's prompt engineering strategies](https://platform.openai.com/docs/guides/prompt-engineering)

## Verifying Information

Since LLMs can occasionally generate inaccurate information (known as "hallucination"), we recommend verifying critical data during this beta phase.

**Where to verify:**
- [Hgraph Dashboard](https://dashboard.hgraph.com) - Run the same queries for comparison
- [HashScan explorer](https://hashscan.io) - Cross-reference transaction and account data
- Project websites - Verify token information and DeFi metrics

Always verify when making financial decisions, reporting statistics, or debugging smart contracts.

## Safety & Security

The Hgraph MCP Server prioritizes security through multiple layers of protection:

### Read-Only Operations
The server **cannot** write data to the Hedera network, sign transactions, modify blockchain state, access private keys, or execute smart contracts. All operations are strictly read-only queries.

### Security Features
Input validation on all queries using strict schemas, rate limiting to prevent abuse, query timeouts for resource protection, SQL injection prevention through prepared statements, automatic redaction of sensitive data in logs, allowlisted RPC methods only, and Streamable HTTP transport with session management for secure, resumable connections.

### Data Protection
We **never** request or handle private keys, seed phrases, wallet passwords, or authentication credentials beyond your API key. The MCP server only accesses publicly available blockchain data.

## Feedback & Support

We value your feedback as we continue to improve the Hgraph MCP Server during beta:

- **Discord Community**: Join discussions at [discord.gg/dwxpRHHVWX](https://discord.gg/dwxpRHHVWX)
- **Support Documentation**: Visit [our support page](/support)
- **Email Support**: Reach out to [support@hgraph.com](mailto:support@hgraph.com)

## Next Steps

- [View Examples & Use Cases →](/mcp-server/examples)
- [Claude Setup Guide →](/mcp-server/setup-claude)
- [ChatGPT Setup Guide →](/mcp-server/setup-chatgpt)

---

*Thank you for being part of the Hgraph MCP Server beta program. Together, we're making blockchain data more accessible than ever.*
