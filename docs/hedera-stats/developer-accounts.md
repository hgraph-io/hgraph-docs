---
sidebar_position: 4
---

# Active Developer Accounts

An active developer account is any account that performs at least one “creative” or infrastructure-oriented action over a specified period. Examples include deploying or updating smart contracts, creating or minting tokens, or setting up and modifying consensus topics. These accounts represent users who are actively building or expanding the network’s capabilities rather than simply consuming existing services.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Methodology

### Qualifying Transaction Types

**Note:** Only transactions with a result code of `22` (success) are included. Developer accounts are identified by their involvement in one or more of the following activities. Any single occurrence of one of these transactions during the measurement period qualifies the account as a "developer account." The parentheses below include the Mirror Node transaction type IDs.

- **Smart Contract-Related**:
  - Creating a new smart contract (`CONTRACT CREATE` | type = `8`)
  - Updating or upgrading a smart contract (`CONTRACT UPDATE` | type = `9`)

- **Consensus Service-Related**:
  - Creating a new topic (`TOPIC CREATE` | type = `24`)
  - Updating an existing topic (`TOPIC UPDATE` | type = `25`)

- **Token-Related**:
  - Creating a new token (`TOKEN CREATE` | type = `29`)
  - Updating a token’s properties (`TOKEN UPDATE` | type = `36`)
  - Minting new tokens (`TOKEN MINT` | type = `37`)
  - Token “airdrop” (if considered a “creative” transaction) (`TOKEN AIRDROP` | type = `58`)

:::note Hedera Transaction Types
[See this link](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js) for all Hedera transaction codes.
:::

### Exclusion Criteria

- **Contract payers are excluded**. If the transaction payer is itself a smart contract (`e.type = 'CONTRACT'`), it is not counted as a developer account.
- Accounts that do not perform any of the above developer-oriented transactions are not considered developers.
- Regular transactional activity like simple HBAR transfers, token transfers without creation/minting, or reading contract states does not qualify.

## Use Case Example

If you are measuring weekly developer accounts, review all transactions in the past seven days. If an account created a token, minted a new batch of tokens, or deployed a smart contract during that week, it is classified as a developer account for that period.

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active Developer Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_developer_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node