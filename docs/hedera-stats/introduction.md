---
sidebar_position: 1
title: About
---

# About Hedera Stats

Hgraph offers API access to various quantitative statistical measurements for the Hedera network based on open-sourced methodologies outlined in this documentation. These statistics leverage Hedera mirror node data, data computation, 3rd party data sources and Hgraph's GraphQL API and can be used for analysis in various metrics and KPIs. If you're looking to access the "Hedera Stats" via Hgraph's APIs, you can [get started here](https://hgraph.com/hedera). If you're looking to contribute to the "Hedera Stats" project on GitHub, [check out the repository](https://github.com/hgraph-io/hedera-stats).

:::info New Hedera Stats Dashboard
See these Hedera Stats in action using **[Hgraph's new Grafana dashboard](https://hgraph.com/hedera/stats)** demo! A dynamic layout, customizations, visualizations and more.
:::

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, **[get started here](https://www.hgraph.com/hedera)**.
:::

## Why create Hedera Stats?

Understanding the health of the Hedera network is important. To measure this, we use things like TVL, revenue, active accounts, time to consensus and more. What's most important is ensuring the methodology used for these calculations are transparent and comprehensive to maintain consistency. It's also vital to ensure easy access to these data feeds via APIs. Hgraph's data infrastructure makes this possible.

## GitHub Repository

This repository contains the SQL code for these Hedera Stats queries as well as JSON to import a demo Grafana dashboard. It also has information regarding incremental update setup.

**[View Hedera Stats on GitHub →](https://github.com/hgraph-io/hedera-stats)**

## Official Hedera Stats

Hgraph provides access to various Hedera network statistics via the GraphQL API. These statistics offer insights into network activity, token usage, NFT transactions, and economic factors within the Hedera ecosystem. Below is a categorized list of supported metrics, along with descriptions.

### Available Now

- **[HBAR Price](hbar-price)**
- **[Network Revenue](revenue)**
- **[Time to consensus](time-to-consensus)**
- **[Transactions Per Second](transactions-per-second)**
- **[Total Value Locked](total-value-locked)**
- **[Stablecoin Market Cap](stablecoin-market-cap)**
- **[All Active Accounts](active-accounts)**
- **[Active Developer Accounts](developer-accounts)**
- **[Active Retail Accounts](retail-accounts)**
- **[Active Smart Contracts](active-contracts)**

*See these statistics in action on the [Hgraph Hedera Stats demo Grafana dashboard](https://hgraph.com/hedera/stats).*

### Roadmap

- More aggrigate breakdowns for accounts
- New EVM specific statistics
- More computed periods (`hour` and `day`)
- Top 50 contracts, NFTs and fungible tokens
- Additional HBAR related statistics
- More 3rd party data sources
- Granular transaction breakdowns
- More examples and demos

:::info New → Hgraph AI Assistant (Alpha)

Create new GraphQL queries and troubleshoot problems with our new expert AI assistant. Get instant answers to 90% of your questions. **[Learn more](/graphql-assistant)** and **[start a conversation](https://hgraph.com/assistant)**.

:::

## Additional Resources

- [Hedera Mirror Node Docs](https://docs.hedera.com/hedera/core-concepts/mirror-nodes)
- [Hedera Transaction Result Codes](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionResult.js)
- [Hedera Transaction Types](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js)
- [DeFiLlama API Documentation](https://defillama.com/docs/api)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/current/)

## Key Terms

- **Metric:** Measures progress or performance against a defined objective.
- **Statistic:** Describes or summarizes data, often for analysis.
- **KPI:** A measurable value that tracks progress toward a specific goal, indicating how effectively something is performing.
- **Quantitative measurement:** Focuses on numerical, measurable, and objective data. It answers questions like how much, how many, how often, or to what extent.
- **Composite Statistic:** A summarization of data aggrigated from other pre-calculated data.

## Additional Notes

This open source **Hedera Stats** project is developed and maintained by [Hgraph](https://hgraph.com). Do you have questions or feedback? Contact us [here](/overview/contact).

:::info New Hedera Stats Dashboard
See these Hedera Stats in action using **[Hgraph's new Grafana dashboard](https://hgraph.com/hedera/stats)** demo! A dynamic layout, customizations, visualizations and more.
:::