---
sidebar_position: 3
---

# GraphQL FAQ

How does the API format data in comparison to the mirror node REST api?

## Data Formats

### Entity Id Format

Hgraph will return entity ids without the "0.0." prefix. The GraphQL API also expects any variable to be a bigint, and not include the "0.0." prefix. This is true for token ids, account ids, and topic ids.

When passing variables into a query, remember to remove the "0.0." from the variable first.

:::note Why?

The datastore for the GraphQL API stores the shard, realm, & entity id’s as separate numeric values (vs. a singular string value), so we minimize transforms and abstractions for entity ids while preserving the ability to access and manipulate data in its lowest-level form.

This also has the advantage in the future of being able to query by specific shard’s and realm’s.

:::

### Metadata Format
Metadata values are returned in an encoded hex format. Decoding the metadata string is imperitive in order to interact with the metadata string or stringified JSON object.

### Amount / Price Format
All amount values returned are in tiny bars. Be sure to convert the tinybars to HBARs before executing logic or sending back to the user.

## Timestamps

Timestamps are returned in numeric form, `bigint`, and do not fit into the standard javascript `Number` type. One has to take explicit care in conserving the precision of nanoseconds.

The adjacent example demonstrates getting the latest transaction from and fetching a corresponding REST API endpoint utilizing the `json-bigint` library.

:::warning

Without special care, timestamps will be silently rounded!

:::

## Transaction Id
How do I construct a REST API `transactionId`?

The transactionId follows the format `<entity_id>-<seconds>-<nanoseconds>`

:::warning

The timestamp to be used is the valid start timestamp (valid_start_ns) *not* the consensus timestamp.

:::

The GraphQL query to the right will return the latest transaction. An example output is in the `json` tab to the right. The `javascript` tab shows the formula for constructing the transaction id from this output.

Corresponding endpoints:
- https://hashscan.io/mainnet/transaction/0.0.41099-1670266826-039225748
- https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/0.0.41099-1670266826-039225748

Supporting documentation:

- https://docs.hedera.com/guides/core-concepts/transactions-and-queries
- https://docs.hedera.com/guides/docs/mirror-node-api/rest-api#transaction-by-transaction-id