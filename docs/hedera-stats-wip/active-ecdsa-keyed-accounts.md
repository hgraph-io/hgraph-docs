---
sidebar_position: 14
title: Active ECDSA Keyed Accounts
---

# Active ECDSA Keyed Accounts

Accounts secured by an **ECDSA (secp256k1)** key that successfully initiate (pay for) at least one transaction within the selected timeframe. This metric highlights the adoption of Ethereum‑compatible wallets on Hedera.

> **Note:** Documentation for these "Hedera Stats" is currently being developed.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Overview

The total number of unique accounts that:

1. Have an **ECDSA (secp256k1)** public key associated with the account.
2. Submit (pay for) at least one successful transaction (`result = 22`) as `payer_account_id` during the measurement window.

This subset of active accounts represents users relying on Ethereum‑style keys and wallets.

## Methodology

1. Query the mirror node `entity` table for accounts whose `key` field encodes a **compressed ECDSA (secp256k1)** public key (33 bytes, prefix `0x02` or `0x03`).
2. Join these accounts with the `transaction` table on `payer_account_id`.
3. Filter transactions by `result = 22` (`SUCCESS`).
4. Count distinct accounts during the selected time range.
5. Exclude accounts with non-ECDSA keys.

**GraphQL API Endpoint:** `active_ecdsa_keyed_accounts`  
*Note:* This is a placeholder endpoint—final name and schema will be confirmed.

## GraphQL API Examples

*Coming soon:* Query examples using mirror node schema or pre-aggregated metrics endpoint.

## SQL Implementation

*Coming soon:* SQL logic for joining `entity` and `transaction` tables based on ECDSA key encoding and result filtering.

```sql
SELECT COUNT(DISTINCT e.id) AS active_ecdsa_keyed_accounts
FROM entity e
JOIN transaction t
  ON t.payer_account_id = e.id
WHERE e.type = 'ACCOUNT'
  -- skip the first two bytes of the serialized Key and check the actual key prefix
  AND encode(substring(e.key FROM 3 FOR 1), 'hex') IN ('02', '03')
  AND t.result = 22                        -- SUCCESS
  AND t.consensus_timestamp >= (EXTRACT(EPOCH FROM NOW() - INTERVAL '90 days') * 1e9)::BIGINT;
```

## Dependencies

- Hedera mirror node
- `entity` table with account key metadata
- `transaction` table with transaction results
