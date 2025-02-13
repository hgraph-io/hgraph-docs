---
sidebar_position: 12
---

# Stablecoin Market Cap

## Overview
The Stablecoin Market Cap metric tracks the total market capitalization of stablecoins circulating on the Hedera network as reported by DeFiLlama. This metric provides insight into the adoption and liquidity of stablecoins within the ecosystem.

:::note Hedera Data Access
To access this Hedera network statistic ([and others](/category/hedera-stats/)) via Hgraph's GraphQL & REST APIs, [get started here](https://www.hgraph.com/hedera).
:::

## Methodology

### Data Source
- Fetch Method: Stablecoin data is retrieved via an HTTP call to DeFiLlama’s Hedera endpoint at [https://stablecoins.llama.fi/stablecoincharts/Hedera](https://stablecoins.llama.fi/stablecoincharts/Hedera).
- **JSON Structure:** The API returns an array of JSON objects, each containing:
  - `date` (Unix time, in seconds)  
  - `totalCirculatingUSD` (a nested JSON object with pegged currency values, e.g., peggedUSD, peggedCHF, etc.)

### Aggregation & Processing
1. Parse and Expand JSON: Each element in the returned JSON array is parsed. All pegged stablecoin amounts are summed in `totalCirculatingUSD` to derive a daily total market cap.  
2. Convert Timestamps: The `date` field is in Unix time (seconds), which is converted via `to_timestamp(date_sec)`.  
3. Group by Period: The data can be grouped into periods (e.g., daily, weekly, monthly) using `date_trunc(period, to_timestamp(date_sec))`.  
4. Average Market Cap: For each period, the average of these summed market cap values are calculated.

### Time Range Filtering
- The SQL function accepts `start_timestamp` and `end_timestamp` in nanoseconds.  
- These are converted to seconds by dividing by `1,000,000,000` to align with the data’s Unix timestamps.

## Data Representation
Each period represents the average stablecoin market capitalization recorded within that timeframe. The metric is useful for tracking trends in stablecoin adoption and liquidity over time.

### Output Columns
- `timestamp_range`: A Postgres `int8range` indicating the start and end timestamps (in nanoseconds) of the aggregated period.  
- `total`: The *verage stablecoin market cap (in USD) during that period.

## Additional Notes
- This metric relies on third-party data from DeFiLlama, which aggregates stablecoin circulation from various networks.  
- Since values are averaged over each period, they may differ from a single point-in-time “snapshot.”

### SQL Code

```sql
create or replace function ecosystem.stablecoin_marketcap(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default current_timestamp::timestamp9::bigint
)
returns setof ecosystem . metric_total
language sql stable
as $$
with defillama_data as (
    select content::jsonb as content
    from http_get('https://stablecoins.llama.fi/stablecoincharts/Hedera')
),
raw_data as (
    -- “Expand” JSON array -> each row = element of elem array
    -- elem->>>'date' = Unix time (sec), elem->'totalCirculatingUSD' = object with peggedUSD, peggedCHF, etc.
    -- Use CROSS JOIN LATERAL to pull all values from the object (peggedUSD, peggedCHF, ...) and summarize.
    select
        (elem->>'date')::bigint as date_sec,
        sum((kv.value)::numeric) as marketcap
    from defillama_data
         cross join lateral jsonb_array_elements(content) as elem
         cross join lateral jsonb_each(elem->'totalCirculatingUSD') kv
    group by 1
),
avg_in_period as (
    select
        date_trunc(period, to_timestamp(date_sec)) as period_start_timestamp,
        avg(marketcap)::bigint as avg_marketcap
    from raw_data
    where date_sec between (start_timestamp / 1000000000)
                      and (end_timestamp   / 1000000000)
    group by 1
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ) as timestamp_range,
    avg_marketcap::bigint as total
from avg_in_period
order by period_start_timestamp

$$;
```

## Dependencies
* Hedera mirror node
* Internet access (to fetch data via `http_get` from DeFiLlama)