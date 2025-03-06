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

## Official Hedera Stats

Hgraph provides access to various Hedera network statistics via the GraphQL API. These statistics offer insights into network activity, token usage, NFT transactions, and economic factors within the Hedera ecosystem. Below is a categorized list of supported metrics, along with descriptions.

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

## Available Network Statistics

These are Hedera network statistics available using Hgraph's GraphQL API.

### Accounts & Network Participants
These stats track different types of accounts engaging with the network.

| Metric Name                     | Description |
|----------------------------------|-------------|
| `account_growth`                 | Number of new accounts that actively transact (excluding smart contracts and developers). |
| `active_accounts`                | The total number of active accounts, including developers, retail users, and smart contracts. |
| `active_developer_accounts`      | Number of unique developer accounts performing creative transactions (e.g., contract creation, token minting). |
| `active_retail_accounts`         | Number of active accounts that are not smart contracts or developers. |
| `active_smart_contracts`         | Number of unique smart contracts that have had activity during the period. |
| `active_contracts`               | Number of unique contracts that executed transactions during the period. |

### NFT-Specific Metrics
These stats focus on NFTs, including creation, transfers, and market activity.

| Metric Name                      | Description |
|----------------------------------|-------------|
| `active_nft_accounts`            | Number of accounts that actively engaged in NFT-related transactions. |
| `active_nft_builder_accounts`    | Number of NFT builder accounts actively engaged in NFT creation. |
| `accounts_associating_nfts`      | Number of accounts that associated NFTs during the period. |
| `accounts_creating_nft_collections` | Number of accounts that created NFT collections. |
| `accounts_minting_nfts`          | Number of accounts that minted NFTs. |
| `accounts_receiving_nfts`        | Number of accounts that received NFTs. |
| `accounts_sending_nfts`          | Number of accounts that sent NFTs. |
| `nft_collections_created`        | Number of NFT collections created during the period. |
| `nft_holders`                    | Total number of NFT holders in the ecosystem. |
| `nft_market_cap`                 | Total market capitalization of NFTs in the ecosystem. |
| `nft_sales_volume`               | Volume of NFT sales during the period. |
| `nfts_minted`                    | Number of NFTs minted. |
| `nfts_transferred`               | Number of NFTs transferred between accounts. |
| `total_nfts`                     | Total number of NFTs in the ecosystem. |

### Network Performance & Economy
These stats provide insight into the overall network activity and economic indicators.

| Metric Name                      | Description |
|----------------------------------|-------------|
| `network_tps`                    | Transactions per second across the network (measured as an average over the time period). |
| `transactions`                    | Total number of transactions recorded during the period. |
| `network_fee`                     | Total network revenue collected from transaction fees (all fees paid to Hedera). |
| `network_tvl`              | Total value locked (TVL) in USD within Hedera's ecosystem. |
| `stablecoin_marketcap`            | Total market capitalization (USD) of all stablecoins on Hedera (e.g., USDC, USDT). |
| `avg_usd_conversion`              | Average HBAR to USD conversion rate (multiplied by 10,000 for integer representation). |
| `avg_time_to_consensus`       | Average time (in nanoseconds) for transactions to reach consensus. |


### Querying Statistics
You can dynamically fetch all available metrics using the following GraphQL query:

```graphql
query AvailableMetrics {
  ecosystem_metric(distinct_on: name) {
    name
    description {
      description
      methodology
    }
  }
}
```

This will return all metric names and descriptions.

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

## Common Questions & Troubleshooting

### Why am I missing data on certain dates?

- If your query returns missing data for a certain timeframe, verify that you're querying the correct API endpoint.
- `hgraph.dev` is a staging environment and may not always contain complete data.
- `hgraph.io` is the production endpoint, and requires an API key.

### How do I check if a metric is available?

- Use the query below to list all available `ecosystem_metric` names:

```graphql
query AvailableMetrics {
  ecosystem_metric(distinct_on: name) {
    name
  }
}
```

### How do I improve query performance?

- Use `month` or `day` granularity instead of `hour` for large date ranges.
- Apply `limit` and `order_by` to reduce result size.
- Consider caching results if you're querying the same data frequently.