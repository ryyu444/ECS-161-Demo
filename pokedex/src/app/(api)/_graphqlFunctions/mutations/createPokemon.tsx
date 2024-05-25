import { gql } from "@apollo/client";

export const createPokemon = gql`
  mutation CreatePokemon($id: ID!, $name: String!) {
    createPokemon(id: $id, name: $name) {
      id
      name
    }
  }
`;
