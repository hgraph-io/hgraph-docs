---
sidebar_position: 24
title: NFT Collection Volume (Total)
---

# NFT Collection Sales Volume (Total)

This metric tracks the total sales volume of NFT collections on the Hedera network. It calculates the aggregate value in tinybars (the smallest unit of HBAR cryptocurrency) from transactions that involve NFT transfers, assuming positive crypto transfers in those transactions are payments for the NFTs. The payments are attributed proportionally to each NFT collection based on the number of NFTs transferred in the transaction, like dividing a bill among items purchased.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

Hedera Stat Name: **`ecosystem_nft_collection_sales_volume_total`**

> **Note**: The GraphQL query structure for this statistic will be different, as it calls a real-time function.

## Methodology

### Data Sourcing and Filtering

- Data is sourced from Hedera mirror node tables: `transaction` for NFT transfer details, `crypto_transfer` for payment amounts, and `token` for collection names.
- Transactions are filtered to include only those with NFT transfers (nft_transfer field not null), within the specified timestamp range (consensus_timestamp > start_ts and < end_ts), and excluding transaction type 37 (to avoid non-sale activities like mints).
- NFT transfers are expanded from the jsonb array in the transaction table, matching only the provided token_ids (collection identifiers).
- Each NFT transfer is counted as 1 unit for volume apportioning.

### NFT Counts and Transaction Totals Computation

- NFT counts are aggregated per token_id and per transaction timestamp, summing the number of NFTs (num_nfts) for each collection in that transaction.
- Total NFTs per transaction are calculated by summing num_nfts across all relevant token_ids in that transaction.
- Positive crypto transfer amounts (amount > 0, assuming HBAR payments) are summed per transaction timestamp to get the total tinybars paid.

### Sales Volume Calculation

- For each token_id, the sales volume is computed by summing, across all relevant transactions: (total tinybars in transaction \* num_nfts for the token / total NFTs in transaction).
- This proportional allocation ensures fair distribution of payment value when multiple NFTs are transferred in one transaction, like splitting a group dinner cost by portions.
- Results are grouped by token_id, with bigint casting for precision.

### Final Output Construction

- The output joins token_ids with their collection names from the token table.
- Collections with no sales in the period default to 0 total.
- Results are ordered by total sales volume descending, presented as a set of rows with token_id, collection_name, and total.

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

- `start_ts`: the starting timestamp for the data window
- `end_ts`: the ending timestamp for the data window
- `token_ids`: an array of collection IDs

## SQL Implementation

Below is a link to the **Hedera Stats** GitHub repository. The repo contains the SQL function that calculates the **NFT Collection Sales Volume (Total)** statistic outlined in this methodology.

SQL Function: `ecosystem.nft_collection_sales_volume_total`

**[View GitHub Repository →](https://github.com/hgraph-io/hedera-stats)**

## Dependencies

- Hedera mirror node
