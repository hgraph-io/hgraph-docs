---
sidebar_position: 3
---

# Active Accounts

An active account is any account that pays for at least one transaction during a given timeframe. Unlike accounts that only receive value or tokens, active accounts must initiate an operation—such as sending a payment or interacting with a service—thus demonstrating direct network engagement.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Methodology

### Definition of an Active Account:

An account is considered “active” if it pays for at least one transaction within a given time period. The critical distinction here is that the account must be the originator of the transaction rather than a passive recipient.

**Inclusion Criteria:**
- Only transactions with a result code of `22` (success) are included.
- Any account that pays a transaction fee, or otherwise executes an operation that originates from that account’s private key or contract logic (if applicable) counts as active.
- If a transaction is recorded where the account is listed as the payer, that account qualifies as active.

**Exclusion Criteria:**
- Accounts that only receive transactions and never initiate one are not counted as active.
- Receiving token transfers, HBAR deposits, or any other form of inbound-only transaction does not qualify the account as active.

## Categories of Active Accounts
Hgraph tracks active accounts in three main categories:
- [Developer Accounts](developer-accounts)
- [Retail Accounts](retail-accounts)
- [Smart Contracts](active-contracts) 

## Timeframe Consideration:
Determine a specific timeframe (e.g., daily, weekly, monthly) for measurement. An account must initiate at least one qualifying transaction within that period to be considered active for that timeframe.

## Use Case Example

Suppose you are measuring weekly active accounts. You look at all transactions over the past seven days. Any unique account number that appears as the “payer” or “initiator” in at least one transaction during that seven-day window is counted as an active account for that week.

## Fetching Active Accounts via GraphQL

To retrieve the total number of active accounts over a specific period, use the following query:

```graphql
query TotalActiveAccountsPeriod {
  ecosystem_metric_aggregate(
    where: {
      name: { _eq: "active_accounts" },
      period: { _eq: "hour" },
      start_date: { _gte: "2025-01-01T00:00:00", _lt: "2025-02-01T00:00:00" }
    }
  ) {
    aggregate {
      sum {
        total
      }
    }
  }
}

```

## Available Time Periods

The `period` field supports the following values:

- `hour`

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **Active Accounts** statistic outlined in this methodology.

SQL Function: `ecosystem.dashboard_active_accounts`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies
* Hedera mirror node