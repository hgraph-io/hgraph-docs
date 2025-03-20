---
sidebar_position: 1
---

# Installation & Setup

This guide explains how to install and set up the Hgraph SDK, providing streamlined access to Hgraph's API and tools for the Hedera network.

## Requirements & Compatibility

Before installation, ensure you have:

- **Node.js** (v18.x or higher recommended)
- **npm** package manager

Check your versions:
```bash
node -v
npm -v
```

## Installing the SDK

### Using npm (Recommended)

Install the latest stable version:
```bash
npm install --save-exact @hgraph.io/sdk@latest
```

Using `--save-exact` ensures consistent behavior across environments by pinning dependencies to specific versions, aligning with [semantic versioning](https://semver.org).

### Install a Specific Version (Optional)

To install a specific SDK version:
```bash
npm install --save-exact @hgraph.io/sdk@x.y.z
```
Replace `x.y.z` with the desired version number.

### Local Development Installation (Advanced)

Clone and build the SDK locally for development or testing:

```bash
gh repo clone hgraph-io/sdk
cd sdk
npm install
npm run watch
```

Use your local SDK in another project:
```bash
npm install ../sdk
```

## Authenticating

To interact with Hgraph's services, you'll need to authenticate your requests. The SDK supports two primary authentication methods:

### Using an API key

Include your API key in the `x-api-key` header:

```javascript
import HgraphSDK from '@hgraph.io/sdk';

const hgraph = new HgraphSDK({
  headers: {
    'x-api-key': 'your-api-key-here',
  },
});
```

### Using a JSON Web Token (JWT)

JWT authentication provides enhanced security, particularly for front-end applications. This feature is in early access. [Contact support](https://docs.hgraph.com/support) to enable this method.

Example usage:

```javascript
import HgraphSDK from '@hgraph.io/sdk';

const hgraph = new HgraphSDK({
  headers: {
    Authorization: `Bearer your-jwt-token-here`,
  },
});
```

Learn more about JWTs at [jwt.io](https://jwt.io/).

## Quick-Start Examples & Templates

Quickly integrate Hgraph into your project with pre-configured templates:

- [Node.js Template](https://github.com/hgraph-io/nodejs-template): Ideal for backend Node.js applications.
- [Browser Template](https://github.com/hgraph-io/browser-template): Web apps running directly in the browser.
- [Next.js Template](https://github.com/hgraph-io/nextjs-template): Server-rendered Next.js apps.
- [React Template](https://github.com/hgraph-io/react-template): Single-page React applications.
- [React Native Template](https://github.com/hgraph-io/react-native-template): Cross-platform mobile development.

Refer to each template's README for detailed instructions.

## Basic SDK Usage

Perform a basic request:

```javascript
import HgraphSDK from '@hgraph.io/sdk';

const hgraph = new HgraphSDK({
  headers: { 'x-api-key': 'your-api-key-here' }
});

// Example request
hgraph.query({ /* your query here */ })
  .then(response => console.log(response))
  .catch(error => console.error(error));
```

## Troubleshooting & Debugging

### Testing WebSocket Connection

Verify your connection with `wscat`:

```bash
wscat -s 'graphql-ws' -H 'x-api-key: <YOUR_API_KEY>' -c wss://testnet.hedera.api.hgraph.dev/v1/graphql
```

Install `wscat` globally if needed:
```bash
npm install -g wscat
```

### Common Issues

- **Authentication Errors**: Verify API key or JWT.
- **Version Mismatch**: Ensure SDK version compatibility.

## Versioning & Updates

The SDK follows [Semantic Versioning](https://semver.org). Before version 1.0, updates may introduce breaking changes. Pin dependencies to exact versions for stability.