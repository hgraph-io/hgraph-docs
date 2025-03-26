---
sidebar_position: 2
title: Installation
---

# Installation

## Common Questions & Troubleshooting

### Why am I missing data on certain dates?

- If your query returns missing data for a certain timeframe, verify that you're querying the correct API endpoint.
- `hgraph.dev` is a staging environment and may not always contain complete data.
- `hgraph.io` is the production endpoint, and requires an API key.

### How do I check if a metric is available?

- Use the query below to list all available `ecosystem_metric` names:

```graphql
query AvailableMetrics {
  ecosystem_metric(distinct_on: name) {
    name
  }
}
```

### How do I improve query performance?

- Use `month` or `day` granularity instead of `hour` for large date ranges.
- Apply `limit` and `order_by` to reduce result size.
- Consider caching results if you're querying the same data frequently.