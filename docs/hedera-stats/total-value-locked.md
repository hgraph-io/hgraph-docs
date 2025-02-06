---
sidebar_position: 11
---

# Total Value Locked (TVL)

> *Note: Documentation for these "Hedera Stats" is currently being developed and may evolve.*

## Overview
Total Value Locked (TVL) represents the total amount of assets locked within decentralized finance (DeFi) protocols on the Hedera network. This metric provides insights into liquidity, ecosystem adoption, and capital efficiency within Hedera’s DeFi landscape.

:::note Timeframes
Hgraph calculates `hedera_stats_tvl` every 1 day by default, but it can handle other time windows based on the `period` parameter.
:::

## Methodology

1. **Data Source**  
   TVL data is retrieved from the [DeFiLlama](https://api.llama.fi/v2/historicalChainTvl/Hedera) API.

2. **HTTP Retrieval & JSON Parsing**  
   - The function calls `http_get('https://api.llama.fi/v2/historicalChainTvl/Hedera')` to obtain the JSON data.  
   - It extracts each entry’s `date` (in seconds) and `tvl` (numeric) from the JSON array.

3. **Timestamp Conversion & Grouping**  
   - `date_sec` values are converted to timestamps using `to_timestamp(date_sec)`.  
   - The function uses `date_trunc(period, to_timestamp(date_sec))` to group data by the specified period (daily, weekly, monthly, etc.).

4. **Aggregation**  
   - For each period, the function calculates the **average TVL** (`avg(tvl)`).  
   - Only rows where `date_sec` falls between `start_timestamp` and `end_timestamp` (both in nanoseconds) are included.

5. **Final Output**  
   - **timestamp_range:** An `int8range` representing the start of each period to the start of the next period.  
   - **total:** The average TVL (in USD) for that time range.

### Parameters

- **period (text):** Interval for grouping (e.g., `day`, `week`, `month`).  
- **start_timestamp (bigint):** The earliest time (in nanoseconds) to include. Defaults to `0`.  
- **end_timestamp (bigint):** The latest time (in nanoseconds) to include. Defaults to the current timestamp.

## Data Representation
Each row returned by the query corresponds to one period (e.g., one day) and the corresponding average total value locked in the Hedera DeFi ecosystem. Tracking these averages over time helps monitor capital flow trends and overall adoption.

## SQL Code

```sql
create or replace function ecosystem.network_tvl(
    period text,
    start_timestamp bigint default 0,
    end_timestamp bigint default CURRENT_TIMESTAMP::timestamp9::bigint
)
returns setof ecosystem . metric_total
as $$
with defillama_data as (
    select content::jsonb as content
    from http_get('https://api.llama.fi/v2/historicalChainTvl/Hedera')
),
tvl_data as (
    select
        (jsonb_array_elements(content) ->> 'date')::bigint as date_sec,
        (jsonb_array_elements(content) ->> 'tvl')::numeric as tvl
    from defillama_data
),
avg_in_period as (
    select
        date_trunc(period, to_timestamp(date_sec)) as period_start_timestamp,
        avg(tvl)::bigint as avg_tvl
    from tvl_data
    where date_sec between (start_timestamp / 1000000000)
                      and (end_timestamp   / 1000000000)
    group by 1
)
select
    int8range(
        period_start_timestamp::timestamp9::bigint,
        (lead(period_start_timestamp) over (order by period_start_timestamp rows between current row and 1 following))::timestamp9::bigint
    ) as timestamp_range,
    avg_tvl::bigint as total
from avg_in_period
order by period_start_timestamp
$$ language sql stable;
```

## Dependencies
- Hedera mirror node
- Internet access (to fetch data via `http_get` from DeFiLlama)