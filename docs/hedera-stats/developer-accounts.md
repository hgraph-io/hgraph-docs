---
sidebar_position: 4
---

# Developer Accounts

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

A developer account is any account that performs at least one “creative” or infrastructure-oriented action over a specified period. Examples include deploying or updating smart contracts, creating or minting tokens, or setting up and modifying consensus topics. These accounts represent users who are actively building or expanding the network’s capabilities rather than simply consuming existing services.

:::note Timeframes
Hgraph calculates `hedera_stats_developer_accounts` every 1 day.
:::

## Methodology

### Qualifying Transaction Types

**Note:** Only transactions with a result code of `22` (success) are included. Developer accounts are identified by their involvement in one or more of the following activities. Any single occurrence of one of these transactions during the measurement period qualifies the account as a "developer account." The parentheses below include the Mirror Node transaction type IDs.

- **Smart Contract-Related**:
  - Creating a new smart contract (`CONTRACT CREATE` | type = `8`)
  - Updating or upgrading a smart contract (`CONTRACT UPDATE` | type = `9`)

- **Token-Related**:
  - Creating a new token (`TOKEN CREATE` | type = `29`)
  - Updating a token’s properties (`TOKEN UPDATE` | type = `36`)
  - Minting new tokens (`TOKEN MINT` | type = `37`)
  - Token “airdrop” (if considered a “creative” transaction) (`TOKEN AIRDROP` | type = `58`)

- **Consensus Service-Related**:
  - Creating a new topic (`TOPIC CREATE` | type = `24`)
  - Updating an existing topic (`TOPIC UPDATE` | type = `25`)

### Exclusion Criteria

- **Contract payers are excluded**. If the transaction payer is itself a smart contract (`e.type = 'CONTRACT'`), it is not counted as a developer account.
- Accounts that do not perform any of the above developer-oriented transactions are not considered developers.
- Regular transactional activity like simple HBAR transfers, token transfers without creation/minting, or reading contract states does not qualify.

## Use Case

If you are measuring weekly developer accounts, review all transactions in the past seven days. If an account created a token, minted a new batch of tokens, or deployed a smart contract during that week, it is classified as a developer account for that period.

To group transactions by a chosen time period, Hgraph’s logic uses `date_trunc(period, consensus_timestamp)`. The function counts distinct payer accounts within each time window, aligning them to the specified period (e.g., daily, weekly).

---

## Code & Examples

The following code examples show how these calculations are performed. You can use this for reference and testing.

### SQL Code

**Output Explanation**  
- **Time Range**: `int8range` indicating the `[start_timestamp, end_timestamp)` range for each period.  
- **total**: The distinct count of developer `payer_account_id` within that period.

```sql
create or replace function ecosystem.active_developer_accounts(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default CURRENT_TIMESTAMP::timestamp9::bigint
)
returns setof ecosystem . metric_total
as $$
with developer_transactions as (
    select
        t.consensus_timestamp,
        t.payer_account_id
    from transaction t
    join entity e on t.payer_account_id = e.id
    where t.result = 22 -- success result
    and e.type != 'CONTRACT' -- not smart contracts
	and t.type in (8, 9, 29, 36, 37, 58, 24, 25) -- Smart Contract Create / Update Transaction, Token Create / Update / Mint (FT & NFT) Transaction / TokenAirdrop, Create / Update Topic Transaction
    and t.consensus_timestamp between start_timestamp and end_timestamp
),
developer_accounts_per_period as (
    select
        date_trunc(period, consensus_timestamp::timestamp9::timestamp) as period_start_timestamp,
        count(distinct payer_account_id) as total
    from developer_transactions
    group by 1
    order by 1 desc
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ),
    total
from developer_accounts_per_period
$$ language sql stable;
```