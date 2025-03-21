---
sidebar_position: 1
---

# JSON-RPC Relay (Beta Testing)

:::warning Beta Testing Note (Write Transactions)

Hgraph's JSON-RPC relay endpoints are for beta testing only at this current time. **If you plan on making many *write transactions*** (transactions that get sent to consensus nodes), [please reach out to us before testing](/overview/contact). For questions, [join our Discord](https://discord.gg/dwxpRHHVWX).

:::

Hgraph's new Hedera JSON-RPC relay brings new levels of EVM compatibility to the ecosystem. If you're interested in becoming an early tester, **[follow the steps below](#become-an-early-beta-tester)**.

The Hedera JSON-RPC Relay enables developers to interact with the Hedera network using Ethereum-compatible JSON-RPC methods. This allows seamless integration of Ethereum-based tools, such as wallets and developer frameworks, with the Hedera blockchain.

The relay follows the [JSON-RPC 2.0 Specification](https://www.jsonrpc.org/specification) and implements a subset of the [Ethereum JSON-RPC APIs](https://ethereum.github.io/execution-apis/api-documentation/) to facilitate smart contract interactions and transaction execution.

Hgraph offers reliable, fast acces to the Hedera JSON-RPC relay and will select some customers to be early beta testers. 

## Requirements

:::info Paid Plans Only After Beta

We are encouraging developer feedback during our small testing phase. When our beta testing phase is over, **the JSON-RPC relay will be available on the "Developer" plan** and up. [View our subscription pricing plans](https://hgraph.com/hedera).

:::

The Hedera JSON-RPC relay will be available on the following Hgraph susbcription plans at launch:
- Developer
- Startup
- Premium
- Enterprise

See more information [on our pricing page](/overview/pricing).

## API Endpoints
Beta testers can interact with the JSON-RPC relay through the following endpoints:

### Testnet Endpoint (Recommended for Testing)
```
https://testnet.hedera.api.hgraph.io/rpc
```
### Mainnet Endpoint (For Production Testing)
```
https://mainnet.hedera.api.hgraph.io/rpc
```
> **Note:** The naming convention for API endpoints may evolve based on feedback. Currently, `/rpc` is used.

## Authentication
- API requests require an API key for authentication.
- You can obtain an API key by [visiting our website and signing up](https://hgraph.com/hedera)!

### How to Use the API Key
Include the API key in your request headers:
```bash
-H "X-API-KEY: <YOUR_API_KEY>"
```

## Testing the Relay
You can test the JSON-RPC relay by making a simple `curl` request to check the network chain ID.

### Example: Get Network Chain ID
```bash
curl --verbose -X POST \
-H "Content-Type: application/json" \
-H "X-API-KEY: <YOUR_API_KEY>" \
-d '{"jsonrpc":"2.0","id":"2","method":"eth_chainId","params":[null]}' \
https://testnet.hedera.api.hgraph.io/rpc
```

### Expected Response
```json
{
  "result": "00x127",
  "jsonrpc": "2.0",
  "id": 2,
}
```

## Supported JSON-RPC Methods
The relay supports a subset of Ethereum JSON-RPC methods for interacting with the Hedera network. These include:

| Method             | Description |
|--------------------|------------|
| `eth_chainId`      | Returns the chain ID of the connected network. |
| `eth_getBlockByNumber` | Retrieves information about a specific block. |
| `eth_getTransactionByHash` | Returns transaction details based on a transaction hash. |
| `eth_call` | Executes a smart contract read operation. |
| `eth_sendRawTransaction` | Sends a signed transaction to the network. |

For a full list of supported methods, refer to the [Hedera JSON-RPC Relay API documentation](https://github.com/hashgraph/hedera-json-rpc-relay/blob/main/docs/rpc-api.md).

## Notes & Considerations
- Test with the Testnet Endpoint: Before deploying on mainnet, test your integrations using `https://testnet.hedera.api.hgraph.io/rpc`.
- API Key Protection: Do not share your API key. Use environment variables to store it securely.
- Feedback Needed: The `/rpc` endpoint is in its early stages, and user feedback will shape its future structure.

---

## Become an Early Beta Tester
1. [Sign up](https://hgraph.com/hedera) for an Hgraph account.
2. Obtain your API key from Hgraph.
3. Submit a ticket in [Discord](https://discord.gg/dwxpRHHVWX).
   - Let us know you're interested in becoming a beta tester!

For further details and technical insights, refer to the official [Hedera JSON-RPC Relay GitHub repository](https://github.com/hashgraph/hedera-json-rpc-relay/blob/main/docs/rpc-api.md).

:::warning Important Note

Hgraph's JSON-RPC relay endpoints are for beta testing only at this current time. **If you plan on making many *write transactions*** (transactions that get sent to consensus nodes), [please reach out to us before testing](/overview/contact). For questions, [join our Discord](https://discord.gg/dwxpRHHVWX).

:::

### Support
For any issues or questions, [contact support](/support).