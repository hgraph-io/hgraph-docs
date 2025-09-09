---
sidebar_position: 5
---

# Technical Details

This page covers technical specifications for working with ERC token data on Hedera, including account identifiers, event signatures, and data formats.

## Account Identifiers and Aliases

### Understanding Hedera Account Systems

Every entity on Hedera has a unique account ID (e.g., 0.0.12345), but accounts can be referenced through multiple identifiers:

#### 1. Account Number (Native Hedera Format)

- **Format**: `<shard>.<realm>.<account_number>` (e.g., 0.0.924713)
- **Usage**: Native Hedera transactions and queries
- **In Topics**: Stored as 1-8 bytes depending on size

#### 2. Account-num Alias (Long-zero Address)

- **Format**: 20-byte EVM address with 12 leading zeros
- **Example**: `0x00000000000000000000000000000e1c29` (Account 924713)
- **Purpose**: Makes every Hedera account EVM-compatible
- **Resolution**: Direct calculation from bytes (no lookup needed)

#### 3. ECDSA EVM Alias

- **Format**: Standard 20-byte Ethereum address
- **Example**: `0x6d9f1a927cbcb5e2c28d13ca735bc6d6131406da`
- **Purpose**: Allows MetaMask and EVM wallets to interact with Hedera
- **Resolution**: Requires lookup to map to Hedera account ID

### Hollow Accounts and Auto-Creation

When an EVM address receives tokens or HBAR before having a Hedera account:

1. **Hollow Account Creation**: System automatically creates an incomplete account
2. **Properties**: Has account ID and alias, but no key (can receive but not send)
3. **Completion**: Becomes full account when used as fee payer with proper signature
4. **Important**: Every hollow account still has a unique Hedera ID

## Event Detection & Signatures

### Transfer Event

All ERC-20 and ERC-721 tokens emit a standardized `Transfer` event:

```solidity
event Transfer(address indexed from, address indexed to, uint256 value_or_tokenId)
```

**Event Signature Hash:**
```
0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef
```

This signature is the keccak256 hash of the event declaration and is always the same for all ERC Transfer events.

### Approval Event

```solidity
event Approval(address indexed owner, address indexed spender, uint256 value)
```

**Event Signature Hash:**
```
0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925
```

### Token Type Detection

The indexer distinguishes token types by analyzing event structure:

#### ERC-20 Detection
- **Characteristic**: `topic3 IS NULL` 
- **Reason**: Transfer value is stored in the event's data section
- **Structure**: Transfer(from, to, amount) - amount goes in data section

#### ERC-721 Detection
- **Characteristic**: `topic3 IS NOT NULL`
- **Reason**: Unique tokenId is indexed and gets its own topic slot
- **Structure**: Transfer(from, to, tokenId) - tokenId becomes topic3

## Standard ERC Methods

Both ERC-20 and ERC-721 tokens implement standard methods that the indexer queries:

### Common Methods (Both Standards)

```solidity
function name() external view returns (string memory);
function symbol() external view returns (string memory);
```

### ERC-20 Specific Methods

```solidity
function decimals() external view returns (uint8);
function totalSupply() external view returns (uint256);
function balanceOf(address account) external view returns (uint256);
```

### ERC-721 Specific Methods

```solidity
function totalSupply() external view returns (uint256);  // Optional
function ownerOf(uint256 tokenId) external view returns (address);
function tokenURI(uint256 tokenId) external view returns (string memory);
```

## Reliability Scoring

The indexer calculates quality scores based on metadata completeness to help identify well-formed contracts.

### Scoring Methodology

The `metadata_reliability_score` field indicates how many standard methods returned valid data:

#### ERC-20 Tokens (4 fields)

Fields checked: `name`, `symbol`, `decimals`, `totalSupply`

| Score | Fields Extracted | Meaning |
|-------|-----------------|---------|
| 1.00 | 4 of 4 | Fully compliant ERC-20 |
| 0.75 | 3 of 4 | Mostly compliant |
| 0.50 | 2 of 4 | Partial implementation |
| 0.25 | 1 of 4 | Minimal implementation |
| 0.00 | 0 of 4 | No metadata available |

#### ERC-721 NFTs (3 fields)

Fields checked: `name`, `symbol`, `totalSupply` (decimals not applicable)

| Score | Fields Extracted | Meaning |
|-------|-----------------|---------|
| 1.00 | 3 of 3 | Fully compliant ERC-721 |
| 0.67 | 2 of 3 | Mostly compliant |
| 0.33 | 1 of 3 | Minimal implementation |
| 0.00 | 0 of 3 | No metadata available |

#### Unknown/Failed Deployments

For contracts that couldn't be identified as ERC-20 or ERC-721:

| Score | Fields Extracted | Meaning |
|-------|-----------------|---------|
| 1.00 | name AND symbol | Basic token interface |
| 0.50 | name OR symbol | Partial interface |
| 0.00 | Neither | No standard interface |

### Using Reliability Scores

Filter for high-quality tokens in your queries:

```graphql
query ReliableTokens {
  erc_beta_token(
    where: { 
      metadata_reliability_score: { _gte: 0.75 }
      contract_type: { _in: ["ERC_20", "ERC_721"] }
    }
  ) {
    name
    symbol
    metadata_reliability_score
  }
}
```

## Data Encoding Formats

### Address Encoding

Addresses in the GraphQL API are always returned as strings in hex format with 0x prefix:

- **EVM Addresses**: `0x` + 40 hex characters
- **Example**: `0x00000000000000000000000000000000002cc823`

### Numeric Values

Large numbers (balances, token supplies) are returned as strings to preserve precision:

- **Format**: Decimal string representation
- **Example**: `"1000000000000000000"` (1 token with 18 decimals)
- **Max Value**: Full uint256 range (2^256 - 1)

### Timestamps

Two timestamp formats are used:

| Field Type | Format | Example | Description |
|------------|--------|---------|-------------|
| created_timestamp | Nanoseconds | `1698765432100000000` | Hedera consensus time |
| balance_timestamp | Nanoseconds | `1698765432100000000` | Last balance update |
| processing_timestamp | Seconds | `1698765432` | Unix timestamp |

To convert nanoseconds to a readable date:
```javascript
const date = new Date(nanoseconds / 1000000);
```

## Working with Token Balances

### ERC-20 Balances

Balances are stored in the smallest unit (wei):

```javascript
// Convert balance to human-readable format
function formatBalance(balance, decimals) {
  return (BigInt(balance) / BigInt(10 ** decimals)).toString();
}

// Example: 1000000000000000000 with 18 decimals = 1 token
```

### ERC-721 Balances

For NFTs, the balance represents the count of NFTs owned:

```graphql
query NFTCount($accountId: bigint!, $tokenId: bigint!) {
  erc_beta_token_account(
    where: {
      account_id: { _eq: $accountId }
      token_id: { _eq: $tokenId }
    }
  ) {
    balance  # This is the NFT count, not wei
  }
}
```

## Best Practices

### Query Optimization

1. **Use indexes**: Filter by indexed fields like `token_id`, `account_id`
2. **Limit results**: Always use `limit` for large result sets
3. **Select only needed fields**: Don't query unnecessary data

### Handling Large Numbers

Always use appropriate libraries for handling uint256 values:

```javascript
// JavaScript with BigInt
const balance = BigInt("1000000000000000000");

// ethers.js
import { BigNumber } from "ethers";
const balance = BigNumber.from("1000000000000000000");
```

### Account Resolution

When working with addresses:

1. Check if it's a long-zero address (12 leading zeros)
2. If yes, extract the account ID directly
3. If no, it's an EVM alias that needs resolution

```javascript
function isLongZeroAddress(address) {
  return address.startsWith("0x000000000000000000000000");
}

function extractAccountId(longZeroAddress) {
  // Extract last 8 bytes and convert to account number
  const hex = longZeroAddress.slice(-8);
  return parseInt(hex, 16);
}
```