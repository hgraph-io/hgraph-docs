---
sidebar_position: 4
title: ERC vs HTS (Token Types)
---

# Token Types

Understanding the distinction between pure ERC tokens and HTS tokens is crucial when working with token data on Hedera.

:::info In Beta → Hgraph's Hedera ERC Token Data

This new data service is currently in beta and we encourage all users to provide feedback. Please [contact us to share your input](../overview/contact.md).

:::

## What is HTS?

Hedera Token Service (HTS) is a native token system that provides token functionality at the protocol level. HTS tokens have built-in features like KYC, freeze, and custom fees that don't require smart contract deployment.

## Two Types of ERC-Compatible Tokens on Hedera

### 1. Pure ERC Tokens (Tracked by this Indexer)

These are standard smart contracts deployed directly to Hedera's EVM, just like on Ethereum or other EVM-compatible chains.

**Characteristics:**

- Smart contracts deployed directly to the EVM
- Generate real Transfer events from contract code execution
- NOT found in Hedera's native token registry
- Follow standard ERC-20/721 implementations
- Examples: amWHBAR, amUSDC, Aave-style tokens deployed on Hedera

**EVM Addresses:**

- May have leading zeros (e.g., `0x00000000000000000000000000000000002cc823`)
- Standard 20-byte Ethereum addresses

### 2. HTS Tokens with ERC Facades (Not Included)

These are native Hedera tokens that can be accessed through EVM precompiles to provide ERC compatibility.

**Characteristics:**

- Native Hedera Token Service tokens
- Created through Hedera's native token APIs
- Can be accessed via smart contracts using HIP-218/376 precompiles
- Emit standard ERC events when called via smart contracts
- When executed via HAPI (non-EVM), mirror nodes emit synthetic logs to mimic ERC events
- Examples: USDC (0.0.456858), WHBAR (0.0.1456986), KARATE, HST

**Special Addresses:**

- Use derived "long-zero" addresses (entity ID padded with 24 zeros)
- Example: Token 0.0.456858 → `0x0000000000000000000000000000000006f89a`

## How to Identify Token Types

### Identifying HTS Tokens

HTS tokens have these characteristics:

- Have a Hedera token ID (e.g., 0.0.456858)
- Use 8-byte topic format consistently in events
- Events emitted via precompile mechanism
- Have native Hedera features (KYC, freeze, custom fees)
- Can be found in Hedera's token registry

### Identifying Pure ERC Tokens

Pure ERC tokens have these characteristics:

- Only exist as smart contracts on the EVM
- Use various topic formats in events
- Events emitted directly from contract code
- Standard ERC-20/721 smart contract implementations
- No native Hedera token ID

## Why This Distinction Matters

### For Developers

1. **Different APIs**: HTS tokens can be queried through native Hedera APIs, while pure ERC tokens require EVM/contract queries
2. **Event Structure**: Event topic formats differ between the two types
3. **Feature Set**: HTS tokens have additional native features not available to pure ERC tokens

### For Users

1. **Wallet Support**: Some wallets may handle HTS tokens differently than pure ERC tokens
2. **Transaction Fees**: HTS token operations may have different fee structures
3. **Compliance Features**: HTS tokens can have built-in KYC and freeze capabilities

## Examples

### Pure ERC-20 Token Query

```graphql
query GetPureERC20Tokens {
  erc_beta_token(
    where: {
      contract_type: { _eq: "ERC_20" }
      # These are pure ERC tokens deployed as smart contracts
    }
    limit: 10
  ) {
    token_id
    name
    symbol
    decimals
    evm_address
  }
}
```

### Common Pure ERC Tokens on Hedera

| Token   | Contract Address                             | Type   |
| ------- | -------------------------------------------- | ------ |
| amWHBAR | `0x00000000000000000000000000000000002cc823` | ERC-20 |
| amUSDC  | `0x00000000000000000000000000000000002cc824` | ERC-20 |

### Common HTS Tokens (Not in this dataset)

| Token | Hedera ID   | Long-zero Address                            | Type                |
| ----- | ----------- | -------------------------------------------- | ------------------- |
| USDC  | 0.0.456858  | `0x0000000000000000000000000000000006f89a`   | HTS with ERC facade |
| WHBAR | 0.0.1456986 | `0x000000000000000000000000000000000016375a` | HTS with ERC facade |

## Topic Format Variations

When analyzing Transfer events, Hedera account IDs can appear in different formats:

| Length            | Format       | Description      | Example (Account 924713) |
| ----------------- | ------------ | ---------------- | ------------------------ |
| 3 bytes (6 hex)   | Compressed   | Accounts < 16.7M | `0x0e1c29`               |
| 4 bytes (8 hex)   | Padded       | Larger accounts  | `0x000e1c29`             |
| 8 bytes (16 hex)  | HTS Standard | HTS format       | `0x00000000000e1c29`     |
| 20 bytes (40 hex) | EVM Address  | EVM-native       | `0x3a6bef9dc803206a...`  |
| 32 bytes (64 hex) | Full Padding | Ethereum style   | `0x000000...000e1c29`    |

Pure ERC tokens typically use the 20-byte or 32-byte formats, while HTS tokens consistently use the 8-byte format.

## Summary

The Hedera ERC Indexer specifically tracks **pure ERC tokens** - standard smart contracts deployed to Hedera's EVM. These tokens follow the same patterns as ERC tokens on Ethereum and other EVM chains. HTS tokens, while offering ERC compatibility through precompiles, are native Hedera tokens with additional features and are not included in this dataset.

When querying the GraphQL API, all tokens returned are pure ERC implementations, ensuring consistent behavior and standard ERC interfaces.
