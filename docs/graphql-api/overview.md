---
sidebar_position: 1
---

# GraphQL API Overview

Hgraph provides GraphQL API endpoints for accessing our Hedera mirror node and various [subscription plans](https://hgraph.com/pricing) for production access (including free access for experimenting). If you're new to GraphQL, the [official documentation](https://graphql.org/) is a good starting point.

## What is the GraphQL API?

GraphQL is a query language for APIs that allows precise data fetching with a single endpoint, reducing unnecessary data transfer. Its strong type system enables efficient, flexible queries and real-time updates, making it ideal for complex web and mobile applications. This self-documenting approach simplifies development, allowing for rapid frontend changes without backend adjustments, streamlining the creation of responsive, data-driven applications.

## GraphQL vs REST

REST APIs use multiple endpoints and standard HTTP methods, with the server determining the data returned to the client, which can lead to over-fetching or under-fetching of data. In contrast, GraphQL uses a single endpoint and allows clients to specify exactly what data they need through a query language, reducing unnecessary data transfer. While GraphQL can present challenges in caching and tooling for developers, Hgraph addresses these issues by providing solutions that simplify caching and offer robust tooling, making GraphQL more accessible and efficient.

## Playground access

To explore the API schema and try out different queries, you can [access our playground console here](https://console.hgraph.io/).