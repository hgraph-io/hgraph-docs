---
sidebar_position: 2
---

# GraphQL FAQ

How does the API format data in comparison to the mirror node REST api?

:::info New → Hgraph AI Assistant (Alpha)

Create new GraphQL queries and troubleshoot problems with our new expert AI assistant. Get instant answers to 90% of your questions. **[Learn more](/graphql-assistant)** and **[start a conversation](https://hgraph.com/assistant)**.

:::

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

```javascript
const HBAR = amountReturnedFromQuery / 100000000
```

## Timestamps



### Why does the timestamp return as a string when the schema is defined as `bigint`?

Although timestamps are defined as `bigint` in the schema and returned numerically, JavaScript's built-in `Number` type cannot precisely represent integers beyond a certain size, particularly at nanosecond precision. When such large numbers are parsed directly in JavaScript, they may become rounded or truncated due to precision limitations.

To preserve full numeric precision, especially at nanosecond accuracy, frontend applications typically convert these `bigint` timestamps to strings. This approach ensures accurate and lossless representation of timestamp values. Our API intentionally uses `bigint` numeric types internally because the JSON specification does not impose limits on integer precision. Consequently, applications should explicitly handle conversion to strings on the frontend to maintain precision.

If you run the **below example**, you will see that in some applications, including our [GraphQL Query Playground](/overview/dashboard#graphql-playground), the `consensus_timestamp` has quotes placed in the reponse: 

```graphql
query LatestConsensusTimestamp {
  transaction(limit: 1, order_by: {consensus_timestamp: desc}) {
    consensus_timestamp
    consensus_timestamp_iso8601
  }
}
```

**This example** demonstrates getting the latest transaction from and fetching a corresponding REST API endpoint utilizing the `json-bigint` library.

```javascript
import fetch from 'isomorphic-fetch'
import JSONBigInt from 'json-bigint'

const API_KEY = '<HGRAPH_API_KEY>'

const {parse, stringify} = JSONBigInt({
  useNativeBigInt: true,
  // alwaysParseAsBig: true,
})

BigInt.prototype.toJSON = function () {
  if (Number.MIN_SAFE_INTEGER < this && this < Number.MAX_SAFE_INTEGER) return Number(this)
  else return this.toString()
}

async function patchedFetch(...args) {
  const response = await fetch(...args)
  const text = await response.text()

  const json = parse(text)
  response.json = async () => json

  return response
}

async function main() {
  // return
  const response = await patchedFetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': API_KEY,
    },
    // JSON.stringify is okay here because we have no BigInts that need special treatment
    body: stringify({
      query: `
query LatestTransaction {
  transaction(limit: 1, order_by: {consensus_timestamp: desc}) {
    consensus_timestamp
    valid_start_ns
    payer_account_id
  }
}
`,
    }),
  })

  const json = await response.json()

  console.dir(json, {depth: null})

  console.log(stringify(json)) // can also use JSON.stringify because we declared the `.toJSON()` above

  // Test
  const {valid_start_ns, payer_account_id} = json.data.transaction[0]
  const transactionId = `0.0.${payer_account_id}-${valid_start_ns
    .toString()
    .substring(0, 10)}-${valid_start_ns.toString().substring(10)}`

  const restApiEndpoint = `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/${transactionId}`
  if (restApiEndpoint) console.log('🤞')

  const restResponse = await patchedFetch(restApiEndpoint)
  if (restResponse.ok) console.log('✅', response.status)
  else console.log('😕')

  console.dir(await restResponse.json(), {depth: null})
}

main()
```

:::warning

Without explicitly handling large timestamps, precision will be lost due to silent rounding.

:::

## Transaction Id
How do I construct a REST API `transactionId`?

The transactionId follows the format `<entity_id>-<seconds>-<nanoseconds>`

```javascript
const {valid_start_ns, payer_account_id} = json.data.transaction[0]
const transactionId = `0.0.${payer_account_id}-${valid_start_ns.substring(
  0,
  10
)}-${valid_start_ns.substring(10)}`

const restApiEndpoint = `https://mainnet-public.mirrornode.hedera.com/api/v1/transactions/${transactionId}`
```

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

## Query tips

### Getting Transaction Values

When getting transaction values and aggregate transaction sums, be sure to only get the negative values.

If you don't specify only negative (HBAR leaving the account) the value will always be 0.

This is because the API will total the amount leaving as negative and the amount being received as positive which will always be 0.

In the example below, we remove all values under 1 HBAR (100,000,000 tiny bars). This is a good way to not have the fees of the transaction come back in the query.

```javascript
transactions {
  crypto_transfer(where: {amount: {_lte: "-100000000"}}) {
    amount
  }
  sender_account_id
}
```