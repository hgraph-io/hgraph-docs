---
sidebar_position: 2
---

# REST API Endpoints

Our Hedera mirror node REST API follows this structure:

```
/v1/<api-key>/<full-rest-endpoint>
```

For example:

```
https://mainnet.hedera.api.hgraph.dev/v1/<api-key>/api/v1/transactions
```

> Alternatively, you may pass your API key in the Authorization header. If using this method, omit the `<api-key>` section from the URL pathname.

* For testing and development purposes, use the `.dev` environment.
* For live, production purposes, use `.io` environment.

## Obtaining an API Key
To access our API, you will need a valid API key. Visit [your account dashboard](https://console.hgraph.io) to generate a key or contact [support](/support).

:::note

We are currently upgrading our systems (for self-serve API key generation) and documentation. This page will be updated soon.

:::
