---
sidebar_position: 24
title: NFT Collection Volume (Total)
---

# NFT Collection Sales Volume (Total)

This metric tracks the total gross HBAR volume attributed to NFT collections on the Hedera network. It sums positive HBAR transfers from transactions that include NFT movements and excludes any positive HBAR paid to treasuries of tokens moved in that transaction; the remaining HBAR is then allocated proportionally to each collection by its share of NFTs moved in the transaction (splitting the bill by item count).

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`ecosystem_nft_collection_sales_volume_total`**

> **Note**: The GraphQL query structure for this statistic will be different, as it calls a real-time function.

## Methodology

### Data Sourcing and Filtering

- Sources: `transaction` (for `nft_transfer` JSON and status/type), `crypto_transfer` (HBAR legs), and `token` (collection names & treasuries).
- Eligible transactions must:
  - contain NFT transfers (`transaction.nft_transfer` is not null),
  - be **successful** (`transaction.result = 22`),
  - **exclude mints** (`transaction.type <> 37`),
  - fall within the requested window (`consensus_timestamp > start_ts AND < end_ts`),
  - and include **at least one positive HBAR transfer** at the same `consensus_timestamp`.
- NFT transfers are expanded from `transaction.nft_transfer` JSON; only the provided `token_ids` are retained for attribution.

### NFT Counts and Transaction Totals

- Each NFT movement counts as **1 unit**.
- For every eligible transaction:
  - **Per‑collection NFT count** = number of expanded NFT rows for that `token_id`.
  - **Total NFTs in tx** = `jsonb_array_length(transaction.nft_transfer)` (counts all NFTs moved across **all** collections in that tx).

### HBAR Pool (with Treasury Exclusion)

- For each eligible transaction, compute the **positive HBAR pool** as the sum of `crypto_transfer.amount > 0` at that `consensus_timestamp`, **excluding any leg where the recipient is a `token.treasury_account_id`** of **any** token moved in that transaction.
- This yields a gross HBAR pool that still includes marketplace fees and royalties, but **excludes treasury self‑payments**.

### Sales Volume Allocation

- Per transaction and per collection:
  - **Allocated HBAR** = `positive_hbar_ex_treasury * (collection_nfts / total_nfts_in_tx)`.
- The final collection total is the sum of allocated HBAR across all eligible transactions in the window.

### Final Output Construction

- Join each requested `token_id` to `token.name` as `collection_name`.
- Collections with no eligible sales in the window return `total = 0`.
- Output columns: `token_id`, `collection_name`, `total` (tinybars), ordered by `total` descending.

## Interpretation & Limitations

- **Gross measure**: includes royalties and marketplace fees that are not paid to treasury accounts; **does not remove node/network fee credits** and **does not include non‑HBAR (HTS‑token) payments**.
- **Open interval**: the time filter is `start_ts < consensus_timestamp < end_ts` (nanoseconds).
- Uses real‑time function execution; results reflect current mirror node state.

## GraphQL API Examples

Test out these queries using our [developer playground](https://dashboard.hgraph.com).

### Fetch total sales volume for specified collections over a time period

```graphql
# Fetch total sales volume for 5 NFT collections in the first half of 2025
query NFTCollectionSalesVolumeTotal {
  ecosystem_nft_collection_sales_volume_total(
    args: {
      token_ids: "{878200, 1350444, 2179656, 6178143, 8302178}",
      start_ts: "1735689600000000000",
      end_ts: "1751327999000000000"
    }
  ) {
    total
    collection_name
    token_id
  }
}
```

## Supported Arguments

- `start_ts`: starting timestamp (ns)
- `end_ts`: ending timestamp (ns)
- `token_ids`: array of collection IDs (token IDs)

## SQL Implementation

The statistic is implemented by a PostgreSQL function in our Hedera Stats codebase.

SQL Function: `ecosystem.nft_collection_sales_volume_total_fix`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
