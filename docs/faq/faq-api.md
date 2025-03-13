---
sidebar_position: 2
---

# Hedera API FAQ

Welcome to the Hedera network API FAQ. Below, you'll find answers to common questions about Hgraph's APIs, including GraphQL, REST, and JSON-RPC relay. Whether you're a developer or new to blockchain technology, this FAQ provides clarity on how to integrate, authenticate, and use Hgraph’s APIs effectively.

:::info New → Hgraph AI Assistant (Alpha)

Create new GraphQL queries and troubleshoot problems with our new expert AI assistant. Get instant answers to 90% of your questions. **[Learn more](/graphql-assistant)** and **[start a conversation](https://hgraph.com/assistant)**.

:::

---

## Introduction to Hgraph APIs

### What APIs does Hgraph offer?
Hgraph provides fast, reliable access to Hedera network data through three APIs:
- **GraphQL API** – A powerful query language that allows precise data fetching with flexible queries and real-time subscriptions.
- **REST API** – A widely used interface with structured endpoints for retrieving Hedera network data.
- **JSON-RPC Relay** – Enables direct interaction with the Hedera EVM for executing smart contract functions. *Coming soon.*

### How does Hgraph ensure fast and scalable data access?
Hgraph operates its own bare-metal hardware infrastructure, ensuring low-latency and high-reliability data delivery. Our APIs are designed for efficiency and can scale with your needs.

### What is Hedera?
Hedera is a decentralized, open-source public [Hiero ledger](https://github.com/hiero-ledger) that uses hashgraph consensus, offering fast, secure, and energy-efficient transactions for businesses and developers, governed by top organizations.

### What are Hedera mirror nodes?
Hedera mirror nodes process and store historical transaction data, enabling applications to access and analyze Hedera network activity efficiently. Hgraph operates hardware mirror nodes, ensuring reliable data access for developers and businesses. [Learn more](https://www.hgraph.com/blog/hedera-mirror-node).

---

## Getting Started

### How do I sign up and get API keys?
1. Create an [Hgraph account](https://dashboard.hgraph.com).
2. Get a free API key.
3. Upgrade to a plan later.

**[Get a free APi key →](https://dashboard.hgraph.com)**

### How do I get support?
- Use our [Hgraph AI Assistant](/graphql-assistant)
- Send a question [in our Discord](https://discord.gg/dwxpRHHVWX)
- Get support info [here](/support).

### Where can I find example queries and integration guides?
Hgraph’s documentation includes:
- [GraphQL](/category/graphql-api)
- [REST API](/category/rest-api)
- [JSON-RPC relay](/category/json-rpc)

---

## API Features & Use Cases

### What is the GraphQL API?
GraphQL is a query language for APIs that allows precise data fetching with a single endpoint, reducing unnecessary data transfer. Its strong type system enables efficient, flexible queries and real-time updates, making it ideal for complex web and mobile applications.

### What is the REST API?
The REST API follows the Representational State Transfer (REST) architecture, using standard HTTP methods (GET, POST, PUT, DELETE) to interact with Hedera network data. It is best for developers looking for a simple, structured approach to retrieving data.

### What is JSON-RPC?
JSON-RPC (JavaScript Object Notation - Remote Procedure Call) is a stateless protocol that enables remote function calls using JSON. It allows developers to interact with the Hedera EVM and execute smart contract functions efficiently.

---

## Real-Time Data & WebSockets

### Does Hgraph support WebSocket connections?
Yes! Hgraph offers WebSocket endpoints through GraphQL subscriptions, allowing applications to receive real-time updates on:
- Transaction confirmations
- Account balance changes
- Smart contract events

Learn more: [GraphQL Subscriptions](/graphql-api/subscriptions)

---

## Authentication & Security

### How do I authenticate API requests?
We offer multiple ways to authenticate API requests for our JSON-RPC relay, GraphQL & REST APIs. [Get all the details on this page](/hgraph-sdk/endpoints-authorization).

### How can I protect my API key?
- Keep your API key private.
- Rotate keys periodically for security.
- Use environment variables instead of hardcoding keys in applications.

---

## Infrastructure & Reliability

### What makes Hgraph’s infrastructure unique?
Hgraph operates its own bare-metal servers, optimizing for:
- Low latency: Faster response times for API calls.
- Reliability: Custom failover mechanisms ensure uptime.
- Scalability: Designed to handle surges in traffic.

---

## Common API Usage Questions

### Does Hgraph enforce compute limits?
Yes. Hgraph enforces a timeout of 10 seconds on calls to our API. If a request takes more than 10 seconds to process, it is removed. This can effect a small handful of of users from time to time. If you require accomodation, please contact support@hgraph.com.

### How do I handle rate limits?
Each plan has a set rate limit to ensure fair access. If you exceed your limit, consider:
- Optimizing queries (GraphQL allows fetching only required data).
- Batching requests to reduce API calls.

### What are some common API errors and how do I fix them?
| Error Code | Meaning | Solution |
|------------|---------|-----------|
| 401 | Unauthorized | Check if your API key is correct. |
| 403 | Forbidden | Ensure your plan includes the requested endpoint. |
| 429 | Too Many Requests | Implement exponential backoff and retry. |
| 500 | Server Error | Check Hgraph's status or try again later. |

### Can I request new API features or endpoints?
Yes! We actively take feedback from developers. Submit requests via our [Discord](https://discord.gg/dwxpRHHVWX) or email us at support@hgraph.com.

---

## Support & Resources

### Where can I get help?
Hgraph offers support through multiple channels:
- Discord: [Join the community](https://discord.gg/dwxpRHHVWX)
- Documentation: [Explore docs](https://docs.hgraph.com/)
- Email Support: Contact us at support@hgraph.com