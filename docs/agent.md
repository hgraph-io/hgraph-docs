---
sidebar_position: 3
title: AI Data Agent
slug: /agent
description: Explore Hedera blockchain data with natural language - no coding required
keywords: [AI, Hedera, blockchain, data, natural language, MCP]
---

# Hgraph AI Data Agent

<iframe width="100%" height="400" src="https://www.youtube.com/embed/QnzafWffs38" title="Hgraph AI Data Agent" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{borderRadius: '8px', marginBottom: '20px'}}></iframe>

Explore [Hedera](https://hedera.com) blockchain data using natural language—no coding required.

**Powered by the [Hgraph MCP Server](/mcp-server).**

---

## What is the AI Data Agent?

The [Hgraph AI Data Agent](https://hgraph.ai) is a conversational interface to Hedera blockchain data. Ask questions in plain English (or other languages) and get instant answers about network activity, tokens, accounts, smart contracts, NFTs, and more.

- **Natural language** — No query syntax to learn
- **Real-time data** — Connected to Hgraph's live mirror node infrastructure
- **Conversational** — Ask follow-up questions to dig deeper
- **Accessible** — Built for everyone, not just developers

## Why We Built It

We believe everyone should be able to explore blockchain data—not just developers with API expertise.

The AI Data Agent removes the barrier between your questions and Hedera network insights. Whether you're tracking token activity, analyzing account portfolios, or exploring network trends, you can now get answers in seconds.

Same powerful data. Accessible to everyone.

## How to Access

### [Start Exploring at hgraph.ai →](https://hgraph.ai)

Sign in with any of these options:

- **Email** — One-time password sent to your inbox
- **Google** — Sign in with your Google account
- **GitHub** — Sign in with your GitHub account
- **Hedera Wallet** — Connect via WalletConnect

## Pricing (Beta)

During the beta period, the AI Data Agent offers:

- **Free tier** — Limited daily conversations and replies to try it out
- **Paid tier** — Higher conversation limits for regular use

Pricing and limits may change as we refine the product based on user feedback. Plans start at $18/mo ([more info about our plans](/overview/pricing)).

## Getting Started

1. **Visit** [hgraph.ai](https://hgraph.ai)
2. **Sign in** with your preferred method
3. **Ask a question** about Hedera blockchain data

That's it—start exploring immediately.

## What You Can Ask

The AI Data Agent can answer questions about HBAR transactions, token holders, accounts, smart contracts, NFT collections, and more.

**Try these prompts:**

- "What happened on Hedera yesterday?"
- "Tell me about this account: 0.0.800"
- "Top holders for this token: 0.0.456858"
- "10 recently created smart contracts"
- "HBAR price insights"

For more prompt ideas, see [MCP Server Examples →](/mcp-server/examples)

## Tips for Better Results

### Do

- **Be specific** — Include entity IDs (e.g., "account 0.0.12345") and time ranges (e.g., "in the last 7 days")
- **Ask follow-ups** — The agent remembers context within a conversation
- **Request formats** — Ask for tables, summaries, or specific data points
- **Explore freely** — Try different phrasings if you don't get the expected result

### Avoid

- **Vague requests** — "Show me some data" is harder to answer than "Show me the top 10 tokens by holder count"
- **Write operations** — The agent can only read blockchain data, not send transactions

## Understanding Results

When you ask a question, the agent interprets your request, runs one or more data queries, and formats the results into a readable response.

### Viewing the Underlying Queries

Each response shows the tool calls that were executed. Click on a tool call to expand it and see:

- **Query** — The exact query that was run against the Hedera network
- **Result** — The raw data returned from the query

This transparency helps you understand how answers are generated and verify the data sources. You can copy queries and results directly from the expanded view.

:::tip
If you're learning to work with Hedera data, expanding tool calls is a great way to see real query examples in action.
:::

## For Developers

Want more control over how you access Hedera data?

The **[Hgraph MCP Server](/mcp-server)** powers the AI Data Agent and is available for you to connect directly to your own AI workflows:

- Use with Claude Desktop, ChatGPT, or other MCP-compatible clients
- Integrate into your development environment
- Build custom applications with natural language data access

Both the AI Data Agent and MCP Server are powered by the same Hgraph infrastructure.

[Learn more about the MCP Server →](/mcp-server)

---

## FAQ

### Do I need coding experience?

No. The AI Data Agent is designed for anyone to use, regardless of technical background.

### Is my data private?

The agent queries only public Hedera blockchain data. It does not access private information. Conversations exist only in your browser during the session and are not stored on our servers.

### Can the agent send transactions?

No. The AI Data Agent is read-only. It can query blockchain data but cannot sign or submit transactions, even if you connect a wallet.

### What's the difference between the Agent and MCP Server?

- **AI Data Agent** — Hosted web app, no setup required, instant access
- **MCP Server** — Self-configured connection to your own AI tools, more flexibility

Both provide access to the same Hedera data.

### How current is the data?

Data comes from Hgraph's real-time mirror node infrastructure. Most data is available within seconds of network consensus.

### What if I need API access or a custom solution?

For direct API access, custom integrations, or enterprise needs:

- **[Hgraph APIs](https://hgraph.com/hedera)** — GraphQL, REST, and JSON-RPC access to Hedera data
- **[MCP Server](/mcp-server)** — Connect your own AI tools to Hedera data
- **[Enterprise solutions](/overview/services)** — Custom infrastructure and support

[Contact our team →](/overview/contact)

## Feedback & Support

We're actively improving the AI Data Agent and want to hear from you:

- **Discord** — [Join the Hgraph community](https://discord.gg/dwxpRHHVWX)
- **Email** — support@hgraph.com
- **Documentation** — [Full support resources →](/support)

:::note Beta

The Hgraph AI Data Agent is currently in beta. Features and limits may change as we continue development based on user feedback.

:::
