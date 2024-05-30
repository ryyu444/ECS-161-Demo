# ECS-161-Demo
Tutorial on how to make RESTful vs. GraphQL API calls

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol. RESTful applications use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.

GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data. Unlike REST, GraphQL allows clients to request exactly the data they need, making it more efficient in terms of bandwidth usage.

Key Differences:
  Flexibility: GraphQL allows clients to request exactly the data they need, while REST APIs have fixed endpoints that return fixed data structures.
  Performance: GraphQL can reduce the number of network requests by allowing multiple resource queries in a single request, whereas REST might require multiple requests.
  Versioning: With REST, versioning is typically handled via different endpoint URLs (e.g., /v1/items, /v2/items). In GraphQL, versioning is less of an issue because the client specifies exactly what data it needs
