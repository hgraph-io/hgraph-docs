---
sidebar_position: 2
---

# REST API Endpoints

Our Hedera mirror node REST API follows this structure:

```
/v1/<api-key>/<rest-endpoint>
```

> Alternatively, you may pass your API key in the Authorization header. If using this method, omit the `<api-key>` section from the URL pathname.

* For testing and development purposes, use the `.dev` environment.
* For live, production purposes, use `.io` environment.

## Obtaining an API Key
To access our API, you will need a valid API key. Visit [your account dashboard](https://console.hgraph.io) to generate a key or contact [support](/support).

## Legacy Production Endpoints

For legacy production support, the following endpoints are available:

- https://beta.api.hgraph.io
- https://beta.hedera.api.hgraph.io

:::note

We are currently upgrading our systems (for self-serve API key generation) and documentation. This page will be updated soon.

:::