---
sidebar_position: 1
---

# Installation & Setup

Hgraph provides custom solutions and blazing fast API access. You can [get your free API key](https://hgraph.com/pricing) and upgrade later. åThis guide explains how to install and set up the Hgraph SDK, providing streamlined access to Hgraph's API and tools for the Hedera network.

## Requirements & Compatibility

Before installation, ensure you have:

- **Node.js** ([install](https://nodejs.org/en))
- **npm package manager**

Check your versions:

```bash
node -v
npm -v
```

## Installing the SDK

First, ensure you initialize your project with:

```bash
npm init -y
```

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

For contributors and advanced users interested in local development, clone and build the SDK locally:

```bash
gh repo clone hgraph-io/sdk
cd sdk
npm install
npm run watch
```

To use your local SDK in another project:

```bash
npm install ../sdk
```

# Authenticating

To interact with Hgraph's services, you'll need to authenticate your requests. The SDK supports two primary authentication methods **[(see all available authentication methods)](/hgraph-sdk/endpoints-authorization)**:

## Using an API key

Include your API key in the `x-api-key` header:

```javascript
import HgraphSDK from '@hgraph.io/sdk';

const hgraph = new HgraphSDK({
  headers: {
    'x-api-key': 'your-api-key-here',
  },
});
```

## Using a JSON Web Token (JWT)

JWT authentication provides enhanced security, particularly for front-end applications. This feature is currently in early access. [Contact support](https://docs.hgraph.com/support) to enable this method.

Example usage:

```javascript
import HgraphSDK from '@hgraph.io/sdk';

const hgraph = new HgraphSDK({
  headers: {
    Authorization: `Bearer your-jwt-token-here`,
  },
});
```

**[See all available authentication methods.](/hgraph-sdk/endpoints-authorization)**

# Quick-Start Examples & Templates

Quickly integrate Hgraph into your project with our pre-configured templates:

- [Node.js Template](https://github.com/hgraph-io/nodejs-template): Ideal for backend Node.js applications.
- [Browser Template](https://github.com/hgraph-io/browser-template): For web apps running directly in the browser.
- [Next.js Template](https://github.com/hgraph-io/nextjs-template): Server-rendered Next.js apps.
- [React Template](https://github.com/hgraph-io/react-template): Single-page React applications.
- [React Native Template](https://github.com/hgraph-io/react-native-template): Cross-platform mobile development.

Refer to each template's README for detailed instructions.

---

# Basic SDK Usage

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

# Subscriptions

The Hgraph SDK supports GraphQL subscriptions for real-time data updates. Our [GraphQL Subscriptions documentation](https://docs.hgraph.com/graphql-api/subscriptions) provides guidance on setting up and managing these connections, allowing you to track data changes and efficiently handle subscription lifecycles.

**[GraphQL Subscriptions (docs) →](https://docs.hgraph.com/graphql-api/subscriptions)**

# Troubleshooting & Debugging

## Testing WebSocket Connection

Verify your connection with `wscat`:

```bash
wscat -s 'graphql-ws' -H 'x-api-key: <YOUR_API_KEY>' -c wss://testnet.hedera.api.hgraph.dev/v1/graphql
```

If you don't have `wscat` installed, install it globally:

```bash
npm install -g wscat
```

## Common Issues

- **Authentication Errors**: Verify that your API key or JWT is correct.
- **Version Mismatch**: Ensure that the SDK version is compatible with your project setup.

# Contributing

If you're interested in contributing to the Hgraph SDK or exploring the codebase further, please follow these steps to set up your local development environment:

1. **Clone the Repository**
   ```bash
   gh repo clone hgraph-io/sdk
   ```
2. **Install Dependencies**
   Navigate to the cloned repository and install the necessary npm packages:
   ```bash
   npm install
   ```
3. **Build and Watch for Changes**
   Automatically rebuild the project when file changes are detected:
   ```bash
   npm run watch
   ```
4. **Use the Local SDK in Another Project**
   For testing or development purposes, you can use your local SDK:
   ```bash
   npm install ../sdk
   ```
5. **Debugging with WebSocket**
   Use the WebSocket connection test (as described above) to ensure that everything is configured correctly.

Your contributions and feedback are essential to improving the SDK for the entire Hgraph community.

# Versioning & Updates

The SDK adheres to [Semantic Versioning](https://semver.org). Until version 1.0 is officially released, updates may introduce breaking changes. To maintain stability in production environments, we recommend pinning dependencies to exact versions using the `--save-exact` flag during installation.