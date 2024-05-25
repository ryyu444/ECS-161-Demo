import { gql } from "@apollo/client";

export const getPokemon = gql`
  query GetPokemon($id: ID!) {
    getPokemon(id: $id) {
      id
      name
    }
  }
`;
