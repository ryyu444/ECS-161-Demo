# ECS-161-Demo
Postman: https://www.postman.com/downloads/
Tutorial on how to make RESTful vs. GraphQL API calls

REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- the HTTP protocol. RESTful applications use HTTP requests to perform CRUD (Create, Read, Update, Delete) operations.

Install express: npm install express
Create basic server: 
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John Doe' },
  { id: 2, name: 'Jane Doe' }
];

// GET all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET a single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  res.json(user);
});

// POST a new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update an existing user
app.put('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).send('User not found');
  user.name = req.body.name;
  res.json(user);
});

// DELETE a user
app.delete('/users/:id', (req, res) => {
  users = users.filter(u => u.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

GraphQL is a query language for APIs and a runtime for executing those queries by using a type system you define for your data. Unlike REST, GraphQL allows clients to request exactly the data they need, making it more efficient in terms of bandwidth usage.
Install dependencies: npm install express apollo-server-express graphql
create basic GraphQL server: 
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const app = express();
const port = 3000;

// Sample data
let users = [
  { id: '1', name: 'John Doe' },
  { id: '2', name: 'Jane Doe' }
];

// Define type definitions
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    addUser(name: String!): User
    updateUser(id: ID!, name: String!): User
    deleteUser(id: ID!): User
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    users: () => users,
    user: (parent, args) => users.find(user => user.id === args.id)
  },
  Mutation: {
    addUser: (parent, args) => {
      const newUser = { id: String(users.length + 1), name: args.name };
      users.push(newUser);
      return newUser;
    },
    updateUser: (parent, args) => {
      const user = users.find(user => user.id === args.id);
      if (!user) throw new Error('User not found');
      user.name = args.name;
      return user;
    },
    deleteUser: (parent, args) => {
      users = users.filter(user => user.id !== args.id);
      return { id: args.id, name: '' };
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}${server.graphqlPath}`);
});

Key Differences:
  Flexibility: GraphQL allows clients to request exactly the data they need, while REST APIs have fixed endpoints that return fixed data structures.
  
  Performance: GraphQL can reduce the number of network requests by allowing multiple resource queries in a single request, whereas REST might require multiple requests.
  
  Versioning: With REST, versioning is typically handled via different endpoint URLs (e.g., /v1/items, /v2/items). In GraphQL, versioning is less of an issue because the client specifies exactly what data it needs
