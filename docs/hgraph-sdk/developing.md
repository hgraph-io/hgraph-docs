---
sidebar_position: 4
---

# Developing

If you're interested in contributing to this repository or experimenting with the codebase, follow the steps below to set up your local development environment.

## Getting Started

### 1. Clone the Repository

First, clone the repository to your local machine using GitHub CLI:

```bash
gh repo clone hgraph-io/sdk
```

### 2. Install Dependencies

Navigate to the cloned repository and install all necessary npm packages:

```bash
npm install
```

### 3. Build and Watch for Changes

To automatically rebuild the project whenever you make changes, run:

```bash
npm run watch
```

This command watches for file changes and rebuilds the project accordingly.

### 4. Use the Local SDK in Another Project

If you want to use your local version of the SDK in another project for testing or development purposes, you can set it as a local dependency:

```bash
npm install ../sdk
```

This command tells npm to use the SDK from your local file system instead of fetching it from the npm registry.

## Debugging

To test the WebSocket connection and ensure that everything is set up correctly, you can use `wscat`, a WebSocket client for the command line.

### Test WebSocket Connection

Replace `<YOUR_API_KEY>` with your actual API key and run:

```bash
wscat -s 'graphql-ws' -H 'x-api-key: <YOUR_API_KEY>' -c wss://api.hgraph.dev/v1/graphql
```

This command initiates a WebSocket connection to the GraphQL endpoint at `wss://api.hgraph.dev/v1/graphql` using your API key for authentication.

**Note:** If you don't have `wscat` installed, you can install it globally using:

```bash
npm install -g wscat
```