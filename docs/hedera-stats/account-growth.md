---
sidebar_position: 13
---

# Account Growth

> *Note: Documentation for these "Hedera Stats" are currently being developed.*

## Overview
Account Growth tracks the number of new accounts created in the Hedera ecosystem over a specified time period. This metric focuses on accounts that actively transact but excludes smart contracts and accounts engaging in developer-related transactions. The data provides insight into organic ecosystem growth by measuring new **non-developer** accounts.

:::note Timeframes
Hgraph calculates `hedera_stats_account_growth` every 1 day.
:::

## Methodology
- **Accounts Considered:** Includes newly created accounts that have executed transactions.
- **Exclusions:**
  - Smart contracts.
  - Accounts engaging in specific developer-related transactions.
- **Aggregation:**
  - Accounts are grouped by the selected period (e.g., daily, weekly, monthly).
  - The total count of unique new accounts is recorded for each period.

## Data Representation
Each period represents the number of newly created accounts that meet the above criteria. This allows users to analyze trends in ecosystem adoption and growth over time.

## Additional Notes
- Account Growth provides an important metric for measuring ecosystem expansion and user adoption.
- Since it excludes developer-related transactions, it focuses on real user activity.

## Hgraph API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Code & Examples

The following code examples will allow you to perform these calculations and test retrieving data via our GraphQL API.

### SQL Code

This is the SQL code required to run these calculations.

```
WILL BE ADDED SOON
```

### GraphQL Example Query

This is a GraphQL API query that can be tested using our console.

```
WILL BE ADDED SOON
```

## Dependancies
* Hedera mirror node