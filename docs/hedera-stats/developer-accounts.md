---
sidebar_position: 4
---

# Developer accounts

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

A developer account is any account that performs at least one “creative” or infrastructure-oriented action over a specified period. Examples include deploying or updating smart contracts, creating or minting tokens, or setting up and modifying consensus topics. These accounts represent users who are actively building or expanding the network’s capabilities rather than simply consuming existing services.

:::note Timeframes
Hgraph calculates `hedera_stats_developer_accounts` every 1 day.
:::

## Methodology

### Qualifying Transaction Types

Developer accounts are identified by their involvement in one or more of the following activities. Any single occurrence of one of these transactions during the measurement period qualifies the account as a "developer account."

    - Smart Contract-Related:
        - Creating a new smart contract (`CONTRACT CREATE`)
        - Updating or upgrading a smart contract (`CONTRACT UPDATE`)
    - Token-Related:
        - Creating a new token (`TOKEN CREATE`)
        - Updating a token's properties (`TOKEN UPDATE`)
        - Minting new tokens (`TOKEN MINT`)
        - Potentially performing token airdrops (if considered a "creative" transaction)
    - Consensus Service-Related:
        - Creating a new topic (`TOPIC CREATE`)
        - Updating an existing topic (`TOPIC UPDATE`)

### Exclusion Criteria

    - Accounts that do not perform any of the above developer-oriented transactions are not considered developers.
    - Regular transactional activity like simple HBAR transfers, token transfers without creation/minting, or reading contract states does not qualify.

## Use case

If you are measuring weekly developer accounts, review all transactions in the past seven days. If an account created a token, minted a new batch of tokens, or deployed a smart contract during that week, it is classified as a developer account for that period.

## API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Code examples

```
some code example here
```