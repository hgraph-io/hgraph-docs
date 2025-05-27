---
sidebar_position: 14
title: Active ECDSA Keyed Accounts
---

# Active ECDSA Keyed Accounts

Accounts secured by an **ECDSA (secp256k1)** key that successfully initiate at least one transaction within the selected timeframe. This metric highlights adoption of Ethereum‑compatible wallets on Hedera.

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Overview
The total number of unique accounts that:

1. Have an ECDSA (secp256k1) public key associated with the account.
2. Pay for at least one successful transaction during the measurement window.

This subset of active accounts represents users relying on Ethereum‑style keys and wallets.

## Methodology
1. Query the mirror node `entity` table to find accounts whose `key` field indicates an ECDSA public key.
2. Join these accounts with the `transaction` table on `payer_account_id`.
3. Count distinct accounts with `result = 22` (success) during the chosen period.
4. Accounts without an ECDSA key are excluded.

GraphQL API Endpoint: **`active_ecdsa_keyed_accounts`**

## GraphQL API Examples
TODO

## SQL Implementation
TODO

## Dependencies
* Hedera mirror node
* Entity table with account key metadata

