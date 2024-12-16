---
sidebar_position: 3
---

# Active accounts

An active account is any account that originates at least one transaction during a given timeframe. Unlike accounts that only receive value or tokens, active accounts must initiate an operation—such as sending a payment or interacting with a service—thus demonstrating direct network engagement.

:::note Timeframes
Hgraph calculates `ecosystem_title_here` every 5 minutes.
:::

## Methodology

### Definition of an Active Account:  
   
   An account is considered “active” if it **initiates (triggers)** at least one transaction within a given time period. The critical distinction here is that the account must be the originator of the transaction rather than a passive recipient.

**Inclusion Criteria:**
   - Any account that sends a transaction, pays a transaction fee, or otherwise executes an operation that originates from that account’s private key or contract logic (if applicable) counts as active.
   - If a transaction is recorded where the account is listed as the payer or the initiating entity, that account qualifies as active.

**Exclusion Criteria:**
   - Accounts that only receive transactions and never initiate one are not counted as active.
   - Receiving token transfers, HBAR deposits, or any other form of inbound-only transaction does not qualify the account as active.

## Timeframe Consideration:
   Determine a specific timeframe (e.g., daily, weekly, monthly) for measurement. An account must initiate at least one qualifying transaction within that period to be considered active for that timeframe.
   
   > Example: Suppose you are measuring weekly active accounts. You look at all transactions over the past seven days. Any unique account number that appears as the “payer” or “initiator” in at least one transaction during that seven-day window is counted as an active account for that week.

## Code examples

```
some code example here
```