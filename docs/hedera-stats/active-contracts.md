---
sidebar_position: 6
---

# Active contracts

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

The number of unique smart contracts that have been invoked through at least one state-changing (gas-consuming) transaction within a specified time window. This statistic highlights how many contracts are actively in use, rather than just deployed and idle, providing a snapshot of real engagement and activity in the ecosystem.

:::note Timeframes
Hgraph calculates `hedera_stats_active_contracts` every 5 minutes.
:::

## Methodology

### Identify Smart Contract Accounts
Begin by identifying all accounts that represent deployed smart contracts. This can typically be done by referencing the mirror node's contract-related tables (e.g., `contract` or `contract_result` tables) or by filtering transactions to those that create or associate an account with a contract.

### Define the Activity Criteria
A smart contract is considered "active" if it has executed at least one state-changing transaction within the specified time period. Here's how an "active contract" is qualified:

**Inclusion Criteria:**

    - Transactions that reflect a state change in the contract.
    - Transactions that consume gas, indicating the contract executed logic beyond just reading data.
    - Typical examples include `CONTRACTCALL` transactions that update contract state, mint tokens, transfer values, or perform other on-chain actions that alter the network's ledger.

**Exclusion Criteria:**

    - Read-only queries or calls that do not appear as transactions on the ledger. These often return contract state but do not consume gas or produce a transaction record in the mirror node.
    - Any data retrieval operations or RPC queries that do not modify state.
    - Failed transactions that do not lead to state changes (if such failures do not produce a recorded state-altering transaction) should also be excluded.

## Code examples

```
some code example here
```