---
sidebar_position: 1
---

# Introduction

:::info Work in progress

Documentation for these "Hedera Stats" are currently being developed and is subject to change. Please send any questions to: contact@hgraph.com

:::

Hgraph offers API access to various quantitative statistical measurements for the Hedera network based on open-sourced methodologies outlined in this documentation. These statistics leverage Hedera mirror node data, data computation and Hgraph's GraphQL API and can be used for analysis in various metrics and KPIs. If you're looking to access the "Hedera Stats" APIs, you can [create an Hgraph account](/overview/pricing) and start querying data. If you're looking to contribute to the "Hedera Stats" project on GitHub, [check out the repository](https://github.com/hgraph-io/hedera-stats).

## Why create Hedera Stats?

Understanding the health of the Hedera network is important. To measure this, we use things like TVL, revenue, active accounts, time to consensus and more. What's most important is ensuring the methodology used for these calculations are transparent and comprehensive to maintain consistency. It's also vital to ensure easy access to these data feeds via APIs. Hgraph's data infrastructure makes this possible.

## GitHub Repository

This repository contains the SQL code for these Hedera Stats queries as well as JSON to import a demo Grafana dashboard. It also has information regarding incremental update setup.

**[View Hedera Stats on GitHub →](https://github.com/hgraph-io/hedera-stats)**

## Supported stats

- [Time to consensus](time-to-consensus)
- [Active accounts](active-accounts)
- [Developer accounts](developer-accounts)
- [Retail accounts](retail-accounts)
- [Active contracts](active-contracts)
- [Revenue](revenue)
- [Total value locked](tvl)
- [Stablecoin market cap](stablecoin-market-cap)
- [Account growth](account-growth)
- [Top 50 contracts](top-50-contracts)
- [Top 50 fungible tokens](top-50-fingible-tokens)
- [Transaction volume](transaction-volume)
- [HBAR Price](hbar-price)

## Links

- https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionResult.js
- https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js

## Examples

Hedera Stats APIs being used:

- Hedera website
- ...

## Key Terms

- **Metric:** Measures progress or performance against a defined objective.
- **Statistic:** Describes or summarizes data, often for analysis.
- **KPI:** A measurable value that tracks progress toward a specific goal, indicating how effectively something is performing.
- **Quantitative measurement:** Focuses on numerical, measurable, and objective data. It answers questions like how much, how many, how often, or to what extent.