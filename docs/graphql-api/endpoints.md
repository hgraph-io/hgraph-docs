---
sidebar_position: 4
---

# Endpoints

:::note

We are currently upgrading our systems and documentation. This page will be updated soon.

:::

All of our endpoints are constructed in the following manner:

`https://<testnet|mainnet>.<network>.api.hgraph.<dev|io>/<pathname>`

For our Hedera GraphQL endpoints, the pathname is `/v1/<api-key>/graphql`.

For the Hedera mirror node rest api we follow this pattern `/api/v1/<api-key>/<rest-endpoint>`.
We also support passing an api key via the `Authorization` header, in which case the `<api-key>`
section of the pathname is ommitted.

Our legacy production endpoints are as follows:

- https://beta.api.hgraph.io
- https://beta.hedera.api.hgraph.io
