---
sidebar_position: 6
---

# Active Contracts

The Active Contracts statistic shows the number of unique smart contracts that have been successfully invoked at least once in a state-changing (gas-consuming) transaction within a specified time window. This highlights real engagement with the network, rather than just counting deployed but idle contracts.

:::note Timeframes
Hgraph calculates `hedera_stats_active_contracts` every 1 day by default, but it can also be parameterized for other periods.
:::

## Methodology

### Identify Smart Contract Accounts
Active contracts are identified by querying the `contract_result` table for successful executions (`transaction_result = 22` (success)). Each successful contract call reflects a state change, consuming gas and modifying on-chain data.

### Define the Activity Criteria
A contract is considered "active" if it has executed at least one successful (state-changing) transaction within the specified time period.

**Inclusion Criteria:**
- Transactions in `contract_result` where `transaction_result = 22` (success).
- Transactions that consume gas, indicating the contract executed logic beyond just reading data.
- Typical examples include `CONTRACTCALL` transactions that update contract state, mint tokens, transfer values, or perform other on-chain actions that alter the network's ledger.

**Exclusion Criteria:**
- Read-only calls that do not produce a transaction record in `contract_result`.
- Any data retrieval operations or RPC queries that do not modify state.
- Failed transactions that do not lead to state changes (i.e., `transaction_result != 22`).

### SQL Code

```sql
create or replace function ecosystem.active_smart_contracts(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default CURRENT_TIMESTAMP::timestamp9::bigint
)
returns setof ecosystem . metric_total
as $$
with contract_activity as (
    select
        cr.consensus_timestamp,
        cr.contract_id
    from contract_result cr
    where cr.consensus_timestamp between start_timestamp and end_timestamp
    and cr.transaction_result = 22 -- success result
),
smart_contracts_per_period as (
    select
        date_trunc(period, consensus_timestamp::timestamp9::timestamp) as period_start_timestamp,
        count(distinct contract_id) as total
    from contract_activity
    group by 1
    order by 1 desc
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ),
    total
from smart_contracts_per_period
$$ language sql stable;
```

## Dependencies
* Hedera mirror node