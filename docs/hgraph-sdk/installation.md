---
sidebar_position: 1
---

# Installation & Usage

To install the `@hgraph.io/sdk`, run the following command:

```bash
npm install --save-exact @hgraph.io/sdk@latest
```

This command will add the latest version of the SDK to your project's dependencies, ensuring consistent behavior across environments.

## Authenticating

To interact with Hgraph's services, you'll need to authenticate your requests. There are currently two methods for authentication:

### Using an API key

To authenticate using an API key, include your API key in the `x-api-key header` of each request. Here's how you can set it up:

```javascript
const hgraph = new HGraphSDK({
  headers: {
    'x-api-key': 'your-api-key-here',
  },
});
```

### Using a JSON Web Token (JWT)

For enhanced security, especially in front-end applications, we are rolling out authentication using JSON Web Tokens (JWT). JWTs allow for secure transmission of authentication details without exposing sensitive information.

Learn more about JWTs at [jwt.io](https://jwt.io/).

:::note Early access
JWT authentication is in the early access phase. If you're interested in implementing this method, please [reach out to support](/support) for assistance.
:::

#### Example usage

Once you have your JWT, you can authenticate your requests as follows:

```javascript
import HGraphSDK from '@hgraph.io/sdk';

const hgraph = new HGraphSDK({
  headers: {
    Authorization: `Bearer your-jwt-token-here`,
  },
});
```
