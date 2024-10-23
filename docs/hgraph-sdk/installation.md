---
sidebar_position: 2
---

# Installation & Usage

`npm i --save-exact @hgraph.io/sdk@latest`.

The default export of the SDK is a class that accepts configuration parameters.

## Authenticating

### Using an API key (deprecated)

To authenticate using an API key, pass your API key to the `x-api-key` header on
each request.

### Using a JWT

For front-end solutions, we plan to authenticate using json web tokens. See
[JWT.io](https://jwt.io/). Currently, this functionality is limited, please reach out to
use to utilize this functionality.