---
sidebar_position: 15
title: Active Ed25519 Keyed Accounts
---

# Active Ed25519 Keyed Accounts

Accounts secured by Hedera's native **Ed25519** key type that successfully initiate (pay for) at least one transaction during the selected timeframe. These users typically rely on standard Hedera wallets and SDKs.

> **Note:** Documentation for these "Hedera Stats" is currently being developed.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Overview

The total number of unique accounts that:

1. Have an **Ed25519** public key associated with the account (encoded in the `key` field).
2. Successfully submit (pay for) at least one transaction (`result = 22`) as `payer_account_id` during the measurement window.

Ed25519 keys are Hedera's default account type; thus, this metric indicates general user activity excluding ECDSA‑based wallets.

## Methodology

1. Query the mirror node `entity` table for accounts whose `key` field contains an **Ed25519** public key.
2. Join these accounts with the `transaction` table via `payer_account_id`.
3. Filter transactions by `result = 22` (`SUCCESS`).
4. Count distinct accounts within the selected timeframe.
5. Exclude accounts using other key algorithms.

**GraphQL API Endpoint:** `active_ed25519_keyed_accounts`

## GraphQL API Examples

*Coming soon:* Query examples using mirror node schema or pre-aggregated metrics endpoint.

## SQL Implementation

*Coming soon:* SQL logic for joining `entity` and `transaction` tables based on Ed25519 key encoding and result filtering.

```sql
SELECT
  COUNT(DISTINCT e.id) AS active_ed25519_accounts
FROM entity AS e
JOIN transaction AS t
  ON e.id = t.payer_account_id
WHERE e.type = 'ACCOUNT'
  AND substring(e.key FROM 1 FOR 2) = '\x1220'            -- Ed25519 key prefix
  AND t.result = 22                                       -- SUCCESS
  AND t.consensus_timestamp >= (
        EXTRACT(EPOCH FROM now() - INTERVAL '90 days') * 1e9
      )::bigint;
```

## Dependencies

- Hedera mirror node
- `entity` table with account key metadata (must support Ed25519 key decoding)
- `transaction` table with transaction results
