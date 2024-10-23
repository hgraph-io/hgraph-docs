---
sidebar_position: 2
---

# API questions

**What is the GraphQL API?**\
GraphQL is a query language for APIs that allows precise data fetching with a single endpoint, reducing unnecessary data transfer. Its strong type system enables efficient, flexible queries and real-time updates, making it ideal for complex web and mobile applications. This self-documenting approach simplifies development, allowing for rapid frontend changes without backend adjustments, streamlining the creation of responsive, data-driven applications.

**What is REST?**\
REST (Representational State Transfer) is an architectural style for building APIs that uses standard HTTP methods (like GET, POST, PUT, DELETE) to interact with resources, which are represented by URLs. It emphasizes stateless communication, where each request from the client to the server contains all the information needed to process the request, allowing scalable and flexible web services.

**What is the JSON-RPC?**\
JSON-RPC (JavaScript Object Notation - Remote Procedure Call) is a stateless protocol that uses JSON to encode remote procedure calls, allowing clients to send requests to servers and receive responses, typically over HTTP or WebSockets. It supports method calls with parameters and returns results or errors, making it a simple and flexible way to invoke remote services.

**Does Hgraph have WebSocket Endpoints?**\
Yes, Hgraph offers WebSocket endpoints through GraphQL Subscriptions. Our GraphQL API implements Subscriptions over WebSockets, enabling clients to establish persistent connections for real-time data updates. This allows you to subscribe to specific events or data changes and receive asynchronous notifications as they occur.