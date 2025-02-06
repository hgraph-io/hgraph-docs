---
sidebar_position: 5
---

# Retail accounts

> **Note:** Documentation for these "Hedera Stats" is currently under development.

A retail account is any *active account* (i.e., an account that has initiated at least one successful retail oriented transaction within a given time period) that is not a smart contract account (an account whose `entity.type` is `CONTRACT`).

This means that before we identify “retail accounts,” we first remove any smart contract payers and any accounts that performed developer-like actions.

:::note Timeframes
Hgraph calculates `hedera_stats_retail_accounts` every 1 day by default.
:::

## Methodology

### Prerequisites
1. **[Active Accounts](active-accounts):** The number of unique accounts that initiate *successful* transactions within a timeframe.
2. **[Developer Accounts](developer-accounts):** The number of unique accounts that perform developer-oriented transactions (e.g., creating/updating contracts, tokens, or topics).
3. **[Active Smart Contracts](active-contracts):** The number of unique contract entities that perform at least one action (such as contract calls) during the same timeframe.

### Calculation Overview

1. **Exclude Smart Contracts**: We ignore any account whose `entity.type` is `CONTRACT`.  
2. **Exclude Developer Transactions**: We exclude any account that performed specific “developer” transaction types.  
3. **Count Remaining Accounts**: The remaining active accounts (those with *successful* transactions but none of the developer transaction types) are considered “retail.”

Formally: 

```
Retail Accounts = Active Accounts - (Developer Accounts + Active Smart Contract Accounts)
```


In practice, the SQL filter performs this subtraction implicitly by filtering out contract payers and developer-type transactions in one pass.

## Important Details

- **Transaction Success Code**: Only transactions with `result = 22` (successful) are included in the calculation.
- **Developer Transaction Types**: The query excludes any account that performed transaction types in the set `(8, 9, 29, 36, 37, 58, 24, 25)` within the timeframe. These typically correspond to creating or updating smart contracts, creating or minting tokens, creating or updating topics, etc.
- **Timeframe Filtering**: `start_timestamp` and `end_timestamp` define the boundaries for which transactions are considered. The function also supports a `period` parameter (e.g., `day`) to group accounts by discrete intervals.

## SQL Code

Below is the SQL function that calculates `active_retail_accounts`. It returns rows consisting of:
- An `int8range` indicating the start-to-start boundary of each period.
- A `total` count of *distinct* retail accounts during that period.

```sql
create or replace function ecosystem.active_retail_accounts(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default CURRENT_TIMESTAMP::timestamp9::bigint
)
returns setof ecosystem . metric_total
as $$
with accounts_transactions as (
    select
        t.consensus_timestamp,
        t.payer_account_id,
        t.type
    from transaction t
    join entity e on t.payer_account_id = e.id
    where e.type != 'CONTRACT' -- not smart contracts
    and t.result = 22 -- Success result
    and t.consensus_timestamp between start_timestamp and end_timestamp
),
retail_transactions as (
    select
        consensus_timestamp,
        payer_account_id
    from accounts_transactions t1
    where not exists (
        select 1
        from accounts_transactions t2
        where t1.payer_account_id = t2.payer_account_id
        and type in(8, 9, 29, 36, 37, 58, 24, 25)
    )
),
retail_accounts_per_period as (
    select
        date_trunc(period, consensus_timestamp::timestamp9::timestamp) as period_start_timestamp,
        count(distinct payer_account_id) as total
    from retail_transactions
    group by 1
    order by 1 desc
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ),
    total
from retail_accounts_per_period
$$ language sql stable;
```

## Dependencies
* Hedera mirror node