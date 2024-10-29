---
sidebar_position: 3
---

# Authorization

:::note

We are currently upgrading our account dashboard. This will make it easy to create an Hgraph account, access your API key and subscribe to one of our plans. In the meantime, please reach out to [our support contact](/support) for any requests regarding your account.

:::

## Developer playground

The quickest way to get started is to use the GraphQL editor on our [playground console](https://console.hgraph.io).

The editor in our developer portal to help you develop queries specifically for your use case. You can also use whichever GraphQL client you choose.

If using a different client, you can inspect the network tab in your browser to find your current authorization token and add that as a header to your GraphQL IDE.

## Programmatic access

Hgraph uses API keys to allow programmatic access to the API. You can register for an API key at our [account dashboard](https://console.hgraph.io).

Hgraph expects for the API key to be included in all API requests to the server in a header that looks like the following:

```javascript
// You can use whatever http client library you prefer for simple queries.
// We recommend using a GraphQL specific client for more robust use cases
import {fetch} from 'undici'

async function authenticateWithHgraph() {
  const response = await fetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': '<API_KEY>',
    },
    body: {
      query:
        'query LatestTransaction {\\n transaction(limit: 1, order_by: {consensus_timestamp: desc}) {\\n consensus_timestamp\\n }\\n}\\n',
    },
  })

  const json = response.json()

  // Do what you like with the data
  console.log(json)
}

authenticateWithHgraph()
```