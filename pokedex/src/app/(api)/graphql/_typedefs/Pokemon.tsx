import { gql } from "@apollo/client";

const typeDefs = gql`
  type Pokemon {
    id: ID!
    name: String!
  }

  type Query {
    getPokemon(id: ID!): Pokemon
  }

  type Mutation {
    createPokemon(id: ID!, name: String!): Pokemon
  }
`;

export default typeDefs;
