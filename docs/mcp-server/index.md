---
sidebar_position: 1
title: Overview
description: Connect AI assistants like Claude and ChatGPT to Hedera blockchain data
keywords: [MCP, Model Context Protocol, Hedera, blockchain, AI, Claude, ChatGPT, Hgraph]
---

# Hgraph Beta MCP & AI App Connectors

![Hgraph MCP Server Hero Image](./hgraph-mcp-docs-hero.jpg)

## Connect AI to Hedera Blockchain Data

The Hgraph MCP Server connects AI assistants like Claude and ChatGPT directly to [Hedera](https://hedera.com) blockchain data. Query the network using natural language—no coding required. AI assistants have general blockchain knowledge but cannot access live, network-specific data on their own—they need a real-time connection to Hedera's network, which is what this MCP connector provides.

Built by [Hgraph](https://hgraph.com), we provide enriched data from bare metal Hedera mirror nodes with real-time updates, DeFi metrics, and comprehensive network analytics.

### What you can do

- **✘ Before** - "Give me a portfolio breakdown of my Hedera account" → "I don't have access to current Hedera network mirror node data"
- **✓ After** - "Give me a portfolio breakdown of my Hedera account" → *Real-time answer with current metrics, activity and holdings*

Ask questions in plain English, get live blockchain data. No APIs, no manual queries, no coding, no complexity.

---

## Quick Start {#quick-start}

Choose your preferred AI platform (or see a [comparison](#platforms) further down). Setup instructions include guided video tutorials from [@itsbrandnd](http://x.com/itsbrandond).

<div className="row">
  <div className="col col--6" style={{marginBottom: '20px'}}>
    <div className="card">
      <div className="card__header">
        <h3>Claude Setup</h3>
      </div>
      <div className="card__body">
        <p>Recommended - Full MCP support</p>
      </div>
      <div className="card__footer">
        <a href="/mcp-server/setup-claude" className="button button--primary button--block">Set Up Claude →</a>
      </div>
    </div>
  </div>
  <div className="col col--6" style={{marginBottom: '20px'}}>
    <div className="card">
      <div className="card__header">
        <h3>ChatGPT Setup</h3>
      </div>
      <div className="card__body">
        <p>Developer Mode required (Beta)</p>
      </div>
      <div className="card__footer">
        <a href="/mcp-server/setup-chatgpt" className="button button--secondary button--block">Set Up ChatGPT →</a>
      </div>
    </div>
  </div>
</div>

---

## What You'll Need

### 1. Paid Subscription to Claude or ChatGPT

Pick one of these paid plans.

- **Claude Pro** ($20/month) - [Subscribe →](https://claude.ai)
- **OR ChatGPT Plus** ($20/month) - [Subscribe →](https://chat.openai.com)

### 2. Free Hgraph Account

Create a free Hgraph account to get your API key:

- [Sign up at hgraph.com →](https://hgraph.com/hedera)
- No credit card required
- Takes 2 minutes

**You'll have two accounts:** your paid Claude/ChatGPT account + your free Hgraph account. These are separate and you don't need any other API keys.

---

## Platform Comparison {#platforms}

**Claude (Recommended)**: Native MCP support, works across web/desktop/mobile, easiest setup.

**ChatGPT**: Requires Developer Mode (beta feature), web and mobile supported, slightly more setup steps.

**More platforms coming**: We're working on support for additional AI platforms and custom solutions.

:::note Technical Requirement for Other Clients
The Hgraph MCP Server requires clients that support **Streamable HTTP transport** (MCP spec 2025-06-18). This server does not support the deprecated dual-endpoint SSE transport. All major LLM platforms (Claude, ChatGPT) support Streamable HTTP by default.
:::

## Learn More

- **[Examples & Use Cases →](/mcp-server/examples)** - See what's possible
- **[Usage Tips & Best Practices →](/mcp-server/usage-guide)** - Get the most from your MCP

---

*The Hgraph MCP Server is currently in beta. We're actively improving it based on user feedback. Your experience and suggestions help shape the future of blockchain data access.*
