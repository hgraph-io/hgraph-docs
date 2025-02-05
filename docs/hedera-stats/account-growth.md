---
sidebar_position: 13
---

# Account Growth

## Overview
Account Growth tracks the number of new accounts created in the Hedera ecosystem over a specified time period. This metric focuses on accounts that actively transact but excludes smart contracts and accounts engaging in developer-related transactions. The data provides insight into organic ecosystem growth by measuring new non-developer accounts.

:::note Timeframes
Hgraph calculates `hedera_stats_account_growth` every 5 minutes.
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

## API Endpoint
A dedicated API endpoint from Hgraph will be available.

**Endpoint:** `[Placeholder for API]`

## Additional Notes
- Account Growth provides an important metric for measuring ecosystem expansion and user adoption.
- Since it excludes developer-related transactions, it focuses on real user activity.
- Future iterations may provide more granular breakdowns of account types.

## References
For further details on Hedera account creation and transaction types, refer to the [Hedera Documentation](https://docs.hedera.com).

