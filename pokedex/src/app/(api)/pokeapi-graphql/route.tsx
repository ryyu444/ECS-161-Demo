import { type NextRequest, NextResponse } from "next/server";
import getPokemonQuery from "../_graphqlFunctions/queries/getPokeAPI";

async function GET(request: NextRequest) {
  // get the pokemon name from the request
  const name = request.nextUrl.searchParams.get("name");
  const query = getPokemonQuery(name);

  // get pokemon from pokeapi graphql
  const data = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Method-Used": "graphiql",
    },
    body: JSON.stringify({ query }),
  });

  // convert response to json
  const res = await data.json();

  // return the pokemon in the response
  return NextResponse.json({ data: res.data.pokemon, ok: true });
}

export { GET };
