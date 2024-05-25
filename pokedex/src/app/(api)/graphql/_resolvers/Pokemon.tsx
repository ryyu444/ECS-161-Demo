import { getClient } from "@/app/_utils/client/ApolloClient";
import { createPokemon } from "../../_graphqlFunctions/mutations/createPokemon";
import { getPokemon } from "../../_graphqlFunctions/queries/getPokemon";

const client = getClient();

const resolvers = {
  Query: {
    getPokemon: (_: any, { id }: any) =>
      client.query({
        query: getPokemon,
        variables: { id },
      })
  },

  Mutation: {
    createPokemon: (_: any, { id, name }: any) => {
      client.mutate({
        mutation: createPokemon,
        variables: { id, name },
      });

      return { id, name };
    },
  },
};

export default resolvers;
