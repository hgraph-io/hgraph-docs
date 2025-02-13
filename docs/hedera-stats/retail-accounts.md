---
sidebar_position: 5
---

# Active Retail accounts

Active retail accounts is a composite statistic derived from active accounts by filtering out those that have engaged in developer-oriented transactions or represent smart contracts. This metric identifies the subset of active accounts that have performed successful transactions without any developer-related activity.

Before identifying retail accounts, the function removes accounts that either correspond to smart contracts or have executed any transaction types associated with developer activities.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Methodology

### Prerequisites
1. **Active Accounts:** This metric represents the number of unique accounts that initiate *successful* transactions within a given timeframe.
2. **Developer Transaction Filter:** The function identifies developer-related transactions using specific transaction types (8, 9, 29, 36, 37, 58, 24, 25) that indicate actions such as creating or updating contracts, tokens, or topics (see all Hedera transaction types [here](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js)).
3. **Smart Contract Exclusion:** Accounts associated with smart contracts (where `entity.type` is `CONTRACT`) are excluded from consideration.

### Calculation Overview

1. **Exclude Smart Contracts:** Any account with an `entity.type` of `CONTRACT` is omitted.
2. **Exclude Developer Transactions:** Accounts that have executed any transaction identified by the developer transaction filter are removed.
3. **Count Remaining Accounts:** The active accounts that remain—having performed successful transactions without any developer-related actions—are classified as retail accounts.

In other words, the retail accounts metric is derived by filtering the active accounts to exclude those involved in developer-oriented activities or those representing smart contracts.

Formally: 

```
Active Retail Accounts = [Active Accounts excluding accounts with developer transactions or that are smart contracts]
```

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_retail_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node