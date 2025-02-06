---
sidebar_position: 3
---

# Active accounts

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

An active account is any account that pays for at least one transaction during a given timeframe. Unlike accounts that only receive value or tokens, active accounts must initiate an operation—such as sending a payment or interacting with a service—thus demonstrating direct network engagement.

:::note Timeframes
Hgraph calculates `hedera_stats_active_accounts` every 1 day (or according to the `period` defined in our function, explained below).
:::

## Methodology

### Definition of an Active Account:

An account is considered “active” if it initiates (pays for) at least one transaction within a given time period. The critical distinction here is that the account must be the originator of the transaction rather than a passive recipient.

**Inclusion Criteria:**
- Any account that sends a transaction, pays a transaction fee, or otherwise executes an operation that originates from that account’s private key or contract logic (if applicable) counts as active.
- If a transaction is recorded where the account is listed as the payer or the initiating entity, that account qualifies as active.

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

The final count of active accounts in a given timeframe **unites** all three categories to form one consolidated total.

## SQL Implementation

Below is the SQL function (`ecosystem.active_accounts`) that calculates the total number of active accounts across the above categories.

### Function Parameters

- **period (text)** – Indicates how to group or label intervals (e.g., `'daily'`, `'weekly'`).
- **start_timestamp (bigint)** – The lower bound of the time window for measuring active accounts. Defaults to `0`.
- **end_timestamp (bigint)** – The upper bound of the time window. Defaults to the current timestamp if not specified.

### How It Works

1. **Collect Active Accounts in Subfunctions**  
   The function calls three subfunctions:
   - `ecosystem.active_developer_accounts`
   - `ecosystem.active_retail_accounts`
   - `ecosystem.active_smart_contracts`
   
   Each subfunction identifies accounts that have initiated at least one transaction within the given time range.

2. **Combine Results**  
   The results are combined (`UNION ALL`) into a single set called `active_accounts`.

3. **Aggregate the Counts**  
   In `merged_data`, the total counts from all three categories are summed (`SUM(total)`) by their period start time.

4. **Define Time Segments**  
   The function uses `int8range` and the `LEAD()` window function to partition results into time intervals. Each row has:
   - A time range (`int8range`) from one start timestamp to the next.
   - A `total` indicating the sum of all active accounts within that interval.

5. **Return Values**  
   The function returns a `SETOF ecosystem.metric_total`, with one row per time interval. Being `STABLE`, it produces the same results for identical parameters.

## Code & Examples

The following code examples show how these calculations are performed. You can use this for reference and testing.

### SQL Code

```sql
create or replace function ecosystem.active_accounts(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default CURRENT_TIMESTAMP::timestamp9::bigint
)
returns setof ecosystem.metric_total
as $$
with active_accounts as (
  select *
    from ecosystem.active_developer_accounts(period, start_timestamp, end_timestamp)
  union all select *
    from ecosystem.active_retail_accounts(period, start_timestamp, end_timestamp)
  union all select *
    from ecosystem.active_smart_contracts(period, start_timestamp, end_timestamp)
),
merged_data as (
    select lower(int8range) as period_start_timestamp, sum(total) as total
    from active_accounts d
    group by 1
    order by 1 desc
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ),
    total
from merged_data
$$ language sql stable;
```