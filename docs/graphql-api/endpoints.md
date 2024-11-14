---
sidebar_position: 4
---

# API Endpoints

Our GraphQL API endpoints are structured to support both `testnet` and `mainnet` access.

**Below is the standard format:**

```
https://<testnet|mainnet>.<network>.api.hgraph.<dev|io>/<pathname>
```

* For testing and development purposes, use the `.dev` environment.
* For live, production purposes, use `.io` environment.

## Accessing the Hedera GraphQL API

For accessing Hedera GraphQL endpoints, use the following pathname format:

```
/v1/<api-key>/graphql
```

> Alternatively, you may pass your API key in the Authorization header. If using this method, omit the `<api-key>` section from the URL pathname.

## Obtaining an API Key
To access our API, you will need a valid API key. Visit [your account dashboard](https://console.hgraph.io) to generate a key or contact [support](/support).

:::note

We are currently upgrading our systems (for self-serve API key generation) and documentation. This page will be updated soon.

:::