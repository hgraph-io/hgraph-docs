---
sidebar_position: 5
---

# Retail accounts

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

A "retail account" is essentially an active account that is neither a developer account nor a smart contract account. This category is determined after identifying active and developer accounts, as well as distinguishing active smart contracts.

:::note Timeframes
Hgraph calculates `hedera_stats_retail_accounts` every 1 day.
:::

## Methodology

### Prerequisites:
    - **[Active Accounts](active-accounts):** Already calculated as the number of unique accounts that initiate at least one transaction within a given time period.
    - **[Developer Accounts](developer-accounts):** Already calculated as the number of unique accounts that create or update smart contracts, create or update topics, or create/mint/update tokens within that same timeframe.
    - **[Active Smart Contracts](active-contracts):** Identified as unique smart contract entities that have performed one or more actions (e.g., contract calls) during the same timeframe.

### Calculation Steps:

    - Start with the total number of Active Accounts for the chosen period.
    - Subtract the number of Developer Accounts (as previously defined).
    - Subtract the number of Active Smart Contract Accounts (those representing deployed contracts executing operations).

Formally:  

```
Retail Accounts = Active Accounts - (Developer Accounts + Active Smart Contracts)
```

## Hgraph API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Code & Examples

The following code examples will allow you to perform these calculations and test retrieving data via our GraphQL API.

### SQL Code

This is the SQL code required to run these calculations.

```
WILL BE ADDED SOON
```

### GraphQL Example Query

This is a GraphQL API query that can be tested using our console.

```
WILL BE ADDED SOON
```

## Dependancies
* Hedera mirror node