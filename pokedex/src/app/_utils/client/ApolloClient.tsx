import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    link: new HttpLink({
      uri: "http://localhost:3000/graphql", // make sure this uri is where your GraphQL server is running
    }),
    cache: new InMemoryCache(),
  });
});
