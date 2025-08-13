# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Hgraph documentation website built with Docusaurus 3. It serves as the official documentation for Hgraph's Web3 data infrastructure services, including Hedera mirror node APIs (GraphQL & REST), SDKs, JSON-RPC, and infrastructure services.

## Development Commands

```bash
# Start development server
npm start

# Build production site
npm build

# Type checking
npm run typecheck

# Serve built site locally
npm run serve

# Clear Docusaurus cache (useful for troubleshooting)
npm run clear
```

## Architecture & Structure

### Core Technologies
- **Framework**: Docusaurus 3.6.0
- **Language**: TypeScript
- **React**: 18.x
- **Node**: Requires >= 18.0

### Key Configuration Files
- `docusaurus.config.ts`: Main configuration including site metadata, presets, navigation, footer, and Algolia search
- `sidebars.ts`: Auto-generates sidebar from docs folder structure
- `tsconfig.json`: TypeScript configuration (extends Docusaurus base config)

### Documentation Structure
The documentation content lives in `/docs/` with the following main categories:
- **overview**: Company info, services, pricing, dashboard
- **graphql-api**: GraphQL API documentation and queries
- **rest-api**: REST API endpoints and overview
- **hgraph-sdk**: SDK installation, development, examples
- **json-rpc**: JSON-RPC beta documentation
- **hedera-stats**: Various Hedera network statistics pages
- **faq**: Frequently asked questions by category
- **resources**: Brand assets and resources

### Routing
- Docs are served at the root path (`/`) not `/docs/`
- The homepage is a custom React component at `src/pages/index.tsx`
- Edit URL points to: `https://github.com/hgraph-io/hgraph-docs/edit/main/`

### Deployment
- Production URL: https://docs.hgraph.com
- GitHub organization: hgraph-io
- Repository: hgraph-docs
