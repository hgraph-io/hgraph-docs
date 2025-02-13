---
sidebar_position: 1
---

# Introduction

Hgraph offers API access to various quantitative statistical measurements for the Hedera network based on open-sourced methodologies outlined in this documentation. These statistics leverage Hedera mirror node data, data computation, 3rd party data sources and Hgraph's GraphQL API and can be used for analysis in various metrics and KPIs. If you're looking to access the "Hedera Stats" via Hgraph's APIs, you can [get started here](https://hgraph.com/hedera). If you're looking to contribute to the "Hedera Stats" project on GitHub, [check out the repository](https://github.com/hgraph-io/hedera-stats).

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Why create Hedera Stats?

Understanding the health of the Hedera network is important. To measure this, we use things like TVL, revenue, active accounts, time to consensus and more. What's most important is ensuring the methodology used for these calculations are transparent and comprehensive to maintain consistency. It's also vital to ensure easy access to these data feeds via APIs. Hgraph's data infrastructure makes this possible.

## GitHub Repository

This repository contains the SQL code for these Hedera Stats queries as well as JSON to import a demo Grafana dashboard. It also has information regarding incremental update setup.

**[View Hedera Stats on GitHub →](https://github.com/hgraph-io/hedera-stats)**

## Supported stats

- **[Time to consensus](time-to-consensus)**
- **[Active accounts](active-accounts)**
- **[Developer accounts](developer-accounts)**
- **[Retail accounts](retail-accounts)**
- **[Active contracts](active-contracts)**
- **[Revenue](revenue)**
- **[Total value locked](tvl)**
- **[Stablecoin market cap](stablecoin-market-cap)**
- **Account growth** (in development)
- **Top 50 contracts** (in development)
- **Top 50 fungible tokens** (in development)
- **Transaction volume** (in development)
- **HBAR Price** (in development)

## Additional Links

- [Hedera Transaction Result Codes](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionResult.js)
- [Hedera Transaction Types](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js)

## Key Terms

- **Metric:** Measures progress or performance against a defined objective.
- **Statistic:** Describes or summarizes data, often for analysis.
- **KPI:** A measurable value that tracks progress toward a specific goal, indicating how effectively something is performing.
- **Quantitative measurement:** Focuses on numerical, measurable, and objective data. It answers questions like how much, how many, how often, or to what extent.
- **Composite Statistic:** A summarization of data aggrigated from other pre-calculated data.

## Additional Notes

This open source **Hedera Stats** project is developed and maintained by [Hgraph](https://hgraph.com). Do you have questions or feedback? Contact us [here](/overview/contact).