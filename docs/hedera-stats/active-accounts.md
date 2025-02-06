---
sidebar_position: 3
---

# Active accounts

An active account is any account that pays for at least one transaction during a given timeframe. Unlike accounts that only receive value or tokens, active accounts must initiate an operation—such as sending a payment or interacting with a service—thus demonstrating direct network engagement.

:::note Timeframes
Hgraph calculates `hedera_stats_active_accounts` every 1 day (or according to the `period` defined in our function, explained below).
:::

## Methodology

### Definition of an Active Account:

An account is considered “active” if it pays for at least one transaction within a given time period. The critical distinction here is that the account must be the originator of the transaction rather than a passive recipient.

**Inclusion Criteria:**
- Any account that pays a transaction fee, or otherwise executes an operation that originates from that account’s private key or contract logic (if applicable) counts as active.
- If a transaction is recorded where the account is listed as the payer, that account qualifies as active.

**Exclusion Criteria:**
- Accounts that only receive transactions and never initiate one are not counted as active.
- Receiving token transfers, HBAR deposits, or any other form of inbound-only transaction does not qualify the account as active.

## Timeframe Consideration:
Determine a specific timeframe (e.g., daily, weekly, monthly) for measurement. An account must initiate at least one qualifying transaction within that period to be considered active for that timeframe.

> **Example**: Suppose you are measuring weekly active accounts. You look at all transactions over the past seven days. Any unique account number that appears as the “payer” or “initiator” in at least one transaction during that seven-day window is counted as an active account for that week.

## Categories of Active Accounts
Hgraph tracks active accounts in three main categories:
- [Developer Accounts](developer-accounts)
- [Retail Accounts](retail-accounts)
- [Smart Contracts](active-contracts) 

## SQL Implementation

Below is the SQL function (`ecosystem.dashboard_active_accounts`) that calculates the total number of active accounts across the above categories.

## Code & Examples

The following code examples show how these calculations are performed. You can use this for reference and testing.

### SQL Code

```sql
create or replace function ecosystem.dashboard_active_accounts(
    _interval interval, change boolean = false
)
returns decimal as $$
declare total decimal;
begin
  -- get percent change
  if change then
    WITH time_bounds AS (
        SELECT
            (NOW() - _interval * 2)::timestamp9::bigint AS previous_period_start,
            (NOW() - _interval)::timestamp9::bigint AS current_period_start
    ),
    previous_period AS (
        SELECT COUNT(e.id) AS total
        FROM entity e
        INNER JOIN
          (select distinct payer_account_id, result, consensus_timestamp from transaction) t
          ON t.payer_account_id = e.id
          AND e.type = 'ACCOUNT'
          and t.result = 22
        JOIN time_bounds tb ON
            t.consensus_timestamp BETWEEN tb.previous_period_start AND tb.current_period_start
    ),
    current_period AS (
        SELECT COUNT(e.id) AS total
        FROM entity e
        INNER JOIN
          (select distinct payer_account_id, result, consensus_timestamp from transaction) t
          ON t.payer_account_id = e.id
          AND e.type = 'ACCOUNT'
          and t.result = 22 -- Success result
        JOIN time_bounds tb ON
            t.consensus_timestamp BETWEEN tb.previous_period_start AND tb.current_period_start
    )
    SELECT
        ((current_period.total::DECIMAL / NULLIF(previous_period.total, 0)) - 1) * 100 into total
    FROM current_period, previous_period;
  --return total
  else
    select count(e.id) into total
    FROM entity e
    INNER JOIN
      (select distinct payer_account_id, result, consensus_timestamp from transaction) t
    ON t.payer_account_id = e.id
      AND e.type = 'ACCOUNT'
      and t.result = 22
      and t.consensus_timestamp >= (now() - _interval::interval)::timestamp9::bigint;
  end if;
  return total;
end;
$$ language plpgsql;
```
