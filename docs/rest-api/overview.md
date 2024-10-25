---
sidebar_position: 1
---

# REST API Overview

Hgraph provides REST API endpoints for accessing our Hedera mirror node and various [subscription plans](https://hgraph.com/pricing) for production access (including free access for experimenting). If you're new to REST, the [official documentation](https://restfulapi.net/) is a good starting point.

## What is a REST API?

A REST API (Representational State Transfer Application Programming Interface) is a standardized way for applications to communicate over HTTP, allowing clients to interact with resources (like users, products, etc.) using simple requests such as GET, POST, PUT, and DELETE. It relies on stateless, client-server architecture, where each request contains all necessary information without storing state on the server. REST APIs are scalable, flexible, and use common web standards, making them accessible for a variety of platforms and applications.

## GraphQL vs REST

REST APIs use multiple endpoints and standard HTTP methods, with the server determining the data returned to the client, which can lead to over-fetching or under-fetching of data. In contrast, GraphQL uses a single endpoint and allows clients to specify exactly what data they need through a query language, reducing unnecessary data transfer. While GraphQL can present challenges in caching and tooling for developers, Hgraph addresses these issues by providing solutions that simplify caching and offer robust tooling, making GraphQL more accessible and efficient.