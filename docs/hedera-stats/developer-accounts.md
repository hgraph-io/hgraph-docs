---
sidebar_position: 4
---

# Developer Accounts

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

- **Consensus Service-Related**:
  - Creating a new topic (`TOPIC CREATE` | type = `24`)
  - Updating an existing topic (`TOPIC UPDATE` | type = `25`)

- **Token-Related**:
  - Creating a new token (`TOKEN CREATE` | type = `29`)
  - Updating a token’s properties (`TOKEN UPDATE` | type = `36`)
  - Minting new tokens (`TOKEN MINT` | type = `37`)
  - Token “airdrop” (if considered a “creative” transaction) (`TOKEN AIRDROP` | type = `58`)

[See this link](https://github.com/hashgraph/hedera-mirror-node/blob/main/hedera-mirror-rest/model/transactionType.js) for all Hedera transaction codes.

### Exclusion Criteria

- **Contract payers are excluded**. If the transaction payer is itself a smart contract (`e.type = 'CONTRACT'`), it is not counted as a developer account.
- Accounts that do not perform any of the above developer-oriented transactions are not considered developers.
- Regular transactional activity like simple HBAR transfers, token transfers without creation/minting, or reading contract states does not qualify.

## Use Case

If you are measuring weekly developer accounts, review all transactions in the past seven days. If an account created a token, minted a new batch of tokens, or deployed a smart contract during that week, it is classified as a developer account for that period.

## Code & Examples

The following code examples show how these calculations are performed. You can use this for reference and testing.

### SQL Code

**Output Explanation**  
- **Time Range**: `int8range` indicating the `[start_timestamp, end_timestamp)` range for each period.  
- **total**: The distinct count of developer `payer_account_id` within that period.

```sql
create or replace function ecosystem.dashboard_active_developer_accounts(_interval interval, change boolean = false)
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
        SELECT COUNT(distinct t.payer_account_id) AS total
        FROM transaction t
        JOIN entity e ON t.payer_account_id = e.id AND e.type = ‘ACCOUNT’
        JOIN time_bounds tb ON
            t.consensus_timestamp BETWEEN tb.previous_period_start AND tb.current_period_start
        WHERE t.result = 22 -- Success result
        AND t.type IN (8, 9, 24, 25, 29, 36, 37, 58) -- Smart Contract Create / Update Transaction, Token Create / Update / Mint (FT & NFT) Transaction / TokenAirdrop, Create / Update Topic Transaction
    ),
    current_period AS (
        SELECT COUNT(distinct t.payer_account_id) AS total
        FROM transaction t
        JOIN entity e ON t.payer_account_id = e.id AND e.type = ‘ACCOUNT’
        JOIN time_bounds tb ON
            t.consensus_timestamp >= tb.current_period_start
        WHERE t.result = 22 -- Success result
        AND t.type IN (8, 9, 24, 25, 29, 36, 37, 58) -- Smart Contract Create / Update Transaction, Token Create / Update / Mint (FT & NFT) Transaction / TokenAirdrop, Create / Update Topic Transaction
    )
    SELECT
        ((current_period.total::DECIMAL / NULLIF(previous_period.total, 0)) - 1) * 100 into total
    FROM current_period, previous_period;
  --return total
  else
    select count(distinct e.id) into total
    from transaction as t
    inner join entity as e on t.payer_account_id = e.id
    where t.result = 22 and e.type = ‘ACCOUNT’
      and t.consensus_timestamp >= (now() - _interval::interval)::timestamp9::bigint
      and t.type IN (8, 9, 24, 25, 29, 36, 37, 58); -- Smart Contract Create / Update Transaction, Token Create / Update / Mint (FT & NFT) Transaction / TokenAirdrop, Create / Update Topic Transaction
  end if;
  return total;
end;
$$ language plpgsql;
```