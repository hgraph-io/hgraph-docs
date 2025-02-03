---
sidebar_position: 5
title: Endpoints & authorization
---

# Endpoints & Authorization

:::note
We are launching our new account dashboard soon. This will make it easy to create an Hgraph account, access your API key, and subscribe to one of our plans. In the meantime, please reach out to [our support contact](/support) for any requests regarding your account. [Sign up for an account here](https://hgraph.com/hedera) and our team will be in touch.
:::

This page explains how to authenticate and access the different API endpoints, including GraphQL, REST, and JSON-RPC. All endpoints support the same authentication methods.

**[Obtaining an API key →](#obtaining-an-api-key)**

---

## Authentication Methods

You can include your API key in your API requests using one of the following methods. These methods work uniformly across GraphQL, REST, and JSON-RPC endpoints.

We support multiple authentication methods to accommodate diverse environments and preferences. Whether you use headers or include your API key in the URL, our endpoints work seamlessly across GraphQL, REST, and JSON-RPC.

### 1. Authorization Header

- **With Bearer Prefix:**

  ```http
  Authorization: Bearer <API-KEY>
  ```

- **Without Bearer Prefix:**

  ```http
  Authorization: <API-KEY>
  ```

### 2. X-API-KEY Header

  ```http
  X-API-KEY: <API-KEY>
  ```

### 3. Path-Based API Key

Embed your API key directly in the URL:

```bash
curl -s \
  -H "Content-Type: application/json" \
  https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>/api/v1/accounts
```

:::note Confirm proper URL

When using URL-based authentication, please ensure you include the complete URL path after your API key. Even a small mistake in the path can lead to authentication errors.

:::

---

## GraphQL Authentication

### Endpoint Format

```bash
https://<testnet|mainnet>.<network>.api.hgraph.<dev|io>/v1/graphql
```

### Example Using Header Authentication

Using the X-API-KEY header:

```bash
curl -s \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: <API-KEY>" \
  https://mainnet.hedera.api.hgraph.dev/v1/graphql
```

### Developer Playground

The quickest way to get started is to use our GraphQL editor on the [playground console](https://console.hgraph.io).

### Programmatic Access Example

This query retrieves the latest transaction timestamp:

```javascript
import { fetch } from 'undici';

async function authenticateWithHgraph() {
  const response = await fetch('https://testnet.hedera.api.hgraph.io/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-API-KEY': '<API-KEY>',
    },
    body: JSON.stringify({
      query:
        'query LatestTransaction { transaction(limit: 1, order_by: {consensus_timestamp: desc}) { consensus_timestamp } }',
    }),
  });

  const json = await response.json();
  console.log(json);
}

authenticateWithHgraph();
```

Expected JSON response:

```json
{
  "data": {
    "transaction": [
      {
        "consensus_timestamp": "1738616017995472000"
      }
    ]
  }
}
```

---

## REST Authentication

### Endpoint Format

**URL-Based Authentication:**

```bash
curl -s \
  -H "Content-Type: application/json" \
  https://mainnet.hedera.api.hgraph.dev/v1/<API-KEY>/api/v1/accounts
```

**Header-Based Authentication:**

Using the Authorization header with Bearer:

```bash
curl -s \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <API-KEY>" \
  https://mainnet.hedera.api.hgraph.dev/api/v1/accounts
```

Or using the X-API-KEY header:

```bash
curl -s \
  -H "Content-Type: application/json" \
  -H "X-API-KEY: <API-KEY>" \
  https://mainnet.hedera.api.hgraph.dev/api/v1/accounts
```

---

## JSON-RPC Authentication

Our Hedera JSON-RPC relay is coming soon. [Get notified here](https://hgraph.beehiiv.com/subscribe).

<!-- ### Endpoint Format

```bash
https://<testnet|mainnet>.<network>.api.hgraph.<dev|io>/v1/jsonrpc
```

### Example Using Header-Based Authentication

Using the Authorization header:

```bash
curl -s \
  -H "Content-Type: application/json" \
  -H "Authorization: <API-KEY>" \
  https://mainnet.hedera.api.hgraph.dev/v1/jsonrpc
```

:::tip
You can also pass your API key using the X-API-KEY header if preferred.
:::

--> 

---

## Obtaining an API Key

[Sign up for an account here](https://hgraph.com/hedera) and our team will be in touch.

We are launching our new account dashboard soon. This will make it easy to create an Hgraph account, access your API key, and subscribe to one of our plans. In the meantime, please reach out to [our support contact](/support) for any requests regarding your account. 

:::warning
Never expose your API key in publicly accessible repositories or frontend applications. Use environment variables to store keys securely.
:::

### Environment Information

- **Development & Testing:** Use `hgraph.dev`
- **Production:** Use `hgraph.io`

By following these instructions, you can easily authenticate your requests across all of our endpoints. If you have any questions, please reach out to our [support team](/support).
