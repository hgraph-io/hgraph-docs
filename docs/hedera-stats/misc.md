---
sidebar_position: 13
title: Misc
---

# Un-official Endpoints

These are all other Hedera network statistics available using Hgraph's GraphQL API. These network statistics do not have an official documentation or methodology.

## Query Endpoints

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