---
sidebar_position: 24
title: Installation
---

# Installation

This documentation contains the information needed to re-create Hedera Stats using the Hedera mirror node and other data sources.

## Getting Started

### Prerequisites

- **[Hedera Stats GitHub Repository](https://github.com/hgraph-io/hedera-stats)**
- **Hedera Mirror Node** or access to **Hgraph's GraphQL API**
  - [Create a free account](https://hgraph.com/hedera)
- **Prometheus** (`promtool`) for `avg_time_to_consensus` ([view docs](https://prometheus.io/docs/introduction/overview/))
- **PostgreSQL database** needed for SQL script execution ([view docs](https://www.postgresql.org/docs/current/))
- **DeFiLlama API** for decentralized finance metrics ([view docs](https://defillama.com/docs/api)).

### Installation

Clone the [Hedera Stats repository](https://github.com/hgraph-io/hedera-stats):

```bash
git clone https://github.com/hgraph-io/hedera-stats.git
cd hedera-stats
```

Install Prometheus CLI (`promtool`):

```bash
curl -L -O https://github.com/prometheus/prometheus/releases/download/v3.1.0/prometheus-3.1.0.linux-amd64.tar.gz
tar -xvf prometheus-3.1.0.linux-amd64.tar.gz
# one way to add the tool to the PATH
cp prometheus-3.1.0.linux-amd64/promtool /usr/bin
```

### Initial Configuration

Set up your database:

- Execute `src/up.sql` to create necessary database schema and tables.
- Load initial data using SQL scripts from the `src/jobs` directory.

Configure environment variables (example `.env`):

```env
DATABASE_URL="postgresql://user:password@localhost:5432/hedera_stats"
HGRAPH_API_KEY="your_api_key"
```

Schedule incremental updates:

```bash
crontab -e
1 * * * * cd /path/to/hedera-stats/src/time-to-consensus && bash ./run.sh >> ./.raw/cron.log 2>&1
```

## Troubleshooting & FAQs

### Missing data or discrepancies?

- Verify you're querying the correct API endpoint:
  - Staging environment (`hgraph.dev`) may have incomplete data.
  - Production endpoint (`hgraph.io`) requires an API key.

### Improve query performance:

- Use broader granularity (day/month) for extensive periods.
- Limit result size with `limit` and `order_by`.
- Cache frequently accessed data.
