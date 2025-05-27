---
sidebar_position: 15
title: Active Ed25519 Keyed Accounts
---

# Active Ed25519 Keyed Accounts

Accounts secured by Hedera's native **Ed25519** key type that initiate at least one successful transaction during the chosen timeframe. These users typically rely on standard Hedera wallets and SDKs.

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Overview
The total count of unique accounts that:

1. Have an Ed25519 public key on record.
2. Successfully pay for at least one transaction in the measurement window.

Ed25519 keys are Hedera's default account type, so this metric indicates general user activity excluding ECDSA‑based wallets.

## Methodology
1. Query the mirror node `entity` table for accounts whose `key` field contains an Ed25519 public key.
2. Join these accounts with the `transaction` table via `payer_account_id`.
3. Count distinct accounts with `result = 22` (success) during the requested period.
4. Ignore accounts using other key algorithms.

GraphQL API Endpoint: **`active_ed25519_keyed_accounts`**

## GraphQL API Examples
TODO

## SQL Implementation
TODO

## Dependencies
* Hedera mirror node
* Entity table with account key metadata

