---
sidebar_position: 1
---

# JSON-RPC Relay

Hgraph's Hedera JSON-RPC relay brings new levels of EVM compatibility to the ecosystem, enabling seamless integration with Ethereum-based tools and frameworks.

The [Hedera JSON-RPC Relay](https://docs.hedera.com/hedera/core-concepts/smart-contracts/json-rpc-relay) enables developers to interact with the Hedera network using Ethereum-compatible JSON-RPC methods. This allows seamless integration of Ethereum-based tools, such as wallets and developer frameworks, with the Hedera blockchain. [View the official repository on Hiero](https://github.com/hiero-ledger/hiero-json-rpc-relay).

The relay follows the [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification) and implements a subset of the [Ethereum JSON-RPC APIs](https://ethereum.github.io/execution-apis/api-documentation/) to facilitate smart contract interactions and transaction execution.

Hgraph offers reliable, fast access to the Hedera JSON-RPC relay for all supported subscription plans. 

## Requirements

The Hedera JSON-RPC relay is available on the following Hgraph subscription plans:
- Developer
- Startup
- Premium
- Enterprise

See more information [on our pricing page](/overview/pricing).

## API Endpoints
You can interact with the JSON-RPC relay through the following endpoints:

### Testnet Endpoint
```
https://testnet.hedera.api.hgraph.io/rpc
```
### Mainnet Endpoint
```
https://mainnet.hedera.api.hgraph.io/rpc
```
> **Note:** Currently, `/rpc` is used for JSON-RPC relay endpoints.

## Authentication
- API requests require an API key for authentication.
- You can obtain an API key by [creating an account](https://dashboard.hgraph.com)!
- Production API keys start with `pk_prod_` followed by a unique identifier.

### How to Use the API Key
Include the API key in your URL for path-based authentication:

```
https://testnet.hedera.api.hgraph.io/v1/<YOUR_API_KEY>/rpc
```

## Testing the Relay
You can test the JSON-RPC relay by making simple `curl` requests.

### Example 1: Get Network Chain ID

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id":"1","method":"eth_chainId","params":[]}' \
https://testnet.hedera.api.hgraph.io/v1/<YOUR_API_KEY>/rpc
```

**Response:**
```json
{
  "result": "0x128",  // 296 in decimal for testnet
  "jsonrpc": "2.0",
  "id": "1"
}
```

### Example 2: Get Current Gas Price

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id":"2","method":"eth_gasPrice","params":[]}' \
https://mainnet.hedera.api.hgraph.io/v1/<YOUR_API_KEY>/rpc
```

**Response:**
```json
{
  "result": "0x5879c3d800",  // Gas price in wei
  "jsonrpc": "2.0",
  "id": "2"
}
```

### Example 3: Get Latest Block

```bash
curl -X POST \
-H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","id":"3","method":"eth_getBlockByNumber","params":["latest", false]}' \
https://mainnet.hedera.api.hgraph.io/v1/<YOUR_API_KEY>/rpc
```

The response will include block details such as hash, number, timestamp, and transaction information.

## Supported JSON-RPC Methods
The relay supports a subset of Ethereum JSON-RPC methods for interacting with the Hedera network. These include:

| Method             | Description |
|--------------------|------------|
| `eth_chainId`      | Returns the chain ID of the connected network. |
| `eth_getBlockByNumber` | Retrieves information about a specific block. |
| `eth_getTransactionByHash` | Returns transaction details based on a transaction hash. |
| `eth_call` | Executes a smart contract read operation. |
| `eth_sendRawTransaction` | Sends a signed transaction to the network. |
| `eth_gasPrice` | Returns the current gas price in wei. |

For a full list of supported methods, refer to the [Hedera JSON-RPC Relay API documentation](https://github.com/hiero-ledger/hiero-json-rpc-relay/blob/main/docs/rpc-api.md).

---

For further details and technical insights, refer to the official [Hedera JSON-RPC Relay GitHub repository](https://github.com/hiero-ledger/hiero-json-rpc-relay).

### Support
For any issues or questions, [contact support](/support).