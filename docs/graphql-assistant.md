---
sidebar_position: 11
title: AI Assistant
---

# Hgraph AI Assistant (Alpha)

## Overview

The **[Hgraph Assistant](https://hgraph.com/assistant)** is a specialized, finely-tuned AI assistant designed to help developers easily interact with the Hgraph GraphQL API for querying Hedera Mirror Node Data. It is built to assist users with constructing, troubleshooting, and optimizing GraphQL queries, ensuring seamless access to Hedera's transaction history, token data, smart contract results, and more.

## Why the Assistant Was Created

Our friendly, helpful assistant was developed to:
- Unlock new levels of efficiency for developers and creators.
- Provide real-time, 24/7 support for troubleshooting query errors.
- Improve onboarding for new users learning how to use the Hgraph API.
- Help you optimize query performance by enforcing best practices.
- Explore all new ways of using Hedera data.

## How to Access

The Hgraph Assistant is available via ChatGPT (in-app and browser). You can interact with the assistant anytime to generate queries, debug issues, and get best practices for using the Hgraph API. Our developer playground in the Account Dashboard works best on desktop.

### [Launch Hgraph Assistant ⚡](https://hgraph.com/assistant)

*Note: You will need a free Open AI account to use the Hgraph Assistant.*

## Before You Begin
To get the most out of your session with the Hgraph Assistant, **have the following details ready:**
- Create a **[free Hgraph account](https://dashboard.hgraph.com)** to access the query playground.
- Outline the entity IDs (e.g., Account ID, Token ID, Contract ID) that you need.
- Know your specific data requirements (e.g., latest transactions, NFT transfers, contract activity)
- Expected query output (e.g., fields needed, limits, date ranges)
- Any error messages from previous failed attempts

---

## How to Use the Hgraph Assistant to Create Queries
The [Hgraph Assistant](https://hgraph.com/assistant) follows a structured workflow for creating queries:

1. **Understands your request:** Asks for details (e.g., wallet address, token ID, date filters).
2. **Checks the schema:** Ensures the requested GraphQL data fields exist for the query.
3. **Query construction:** Creates a query optimized for performance and quality.
4. **Validation:** Ensures the query is correct and efficient. Can catch tricky issues.
5. **Query delivery:** Provides the final query with some simple explanations.

## How to Troubleshoot Queries with the Assistant
If your query isn't working, provide:
- The error message.
- The query you tried.
- The expected vs. actual results.
- Any filters or variables you used.

The assistant will diagnose the issue and suggest fixes.

## Best Practices & Tips

Follow these do's and dont's below to most effectively interact with the Hgraph GraphQL query assistant. In general, always be clear with your requests and provide as much information as possible.

### DO:
- **Be specific with your request.** Clearly state what data you need, including relevant account IDs, transaction types, or date ranges. Example: *"I need the latest 10 transactions for account 0.0.12345, including timestamps and fees."*  
- **Provide any relevant context.** If you're troubleshooting a query, include the query you used, the error message you received, and what you expected to happen.  
- **Use clear and structured questions.** If you need multiple queries or have multiple issues, break them into separate questions rather than asking everything in one message.  
- **Ask for explanations when needed.** If you don’t understand a query or concept, ask for clarification or a simpler explanation.  
- **Mention if you need performance optimizations.** If your query is slow or returning too much data, specify that you want a more efficient approach.  
- **Let the assistant know if something doesn’t work.** If a suggested query fails, share the error message so it can be debugged.  
- **Check if your request is within the capabilities of the assistant.** If unsure, ask: *"Can this be done through Hgraph's GraphQL API?"*  

### DON’T:
- **Be vague about what you need.** Avoid generic requests like *"Give me a query for transactions."* Instead, specify filters, fields, and limits.  
- **Paste long errors without explanation.** If you share an error message, add context about what you were trying to do.  
- **Expect features that don’t exist.** The Hgraph Assistant can only help with GraphQL queries for Hgraph’s API - not blockchain transactions, smart contract execution, or off-chain computations. You need to run queries using the [**Hgraph Developer Playground**](https://dashboard.hgraph.com) or your application.  
- **Ignore query best practices.** If advised to use pagination, filters, or indexed fields, follow the guidance to ensure efficient queries.  
- **Request real-time data without specifying a subscription.** If you need a real-time GraphQL subscription, explicitly state that you need a subscription query instead of a regular query.  

By following these best practices, you’ll get faster, clearer, and more effective assistance when working with the Hgraph Assistant.

---

## What is Hgraph?
**[Hgraph](https://hgraph.com)** is an infrastructure and data services company that provides:
- GraphQL, REST, and JSON-RPC APIs for querying Hedera network data.
- Custom Hedera Mirror Nodes for faster data access.
- Enterprise solutions for blockchain and AI applications.

Hgraph operates its own bare-metal mirror nodes, providing low-latency and high-availability data access.

## Hedera Data Flow: How Hgraph Fits In
1. Hedera network consensus nodes processes transactions.
2. Hgraph's mirror nodes store historical transaction data.
3. Hedera network data is accessed via Hgraph's GraphQL API.
4. The Hgraph Assistant creates efficient GraphQL queries.

**Explore more:** [Hgraph official documentation](https://docs.hgraph.com)

## What Are GraphQL Queries?
GraphQL is a query language that enables precise and efficient data retrieval from APIs. Instead of requesting fixed endpoints (like REST), you can define exactly what data you need.

Example Query: Fetch Latest Transactions
```graphql
query LatestTransaction {
  transaction(limit: 1, order_by: {consensus_timestamp: desc}) {
    transaction_hash
    payer_account_id
    charged_tx_fee
    consensus_timestamp
  }
}
```
**Read more:** [GraphQL query guide](https://docs.hgraph.com/category/graphql-api)

## Queries That Require Special Considerations
Some queries require additional processing and should be optimized:
- Large datasets (Use pagination)
- Filtering on `memo` (Avoid unless necessary)
- Aggregated metrics (Use `_aggregate`)
- Nested queries (Limit depth for performance)

Some queries will require further compute or additional database management.

:::info Hgraph Assistant is in Alpha
We are still building and testing the Hgraph Assistant, more things are planned! Please help us by [providing feedback](/overview/contact) so we can improve the Hgraph assistant.
:::