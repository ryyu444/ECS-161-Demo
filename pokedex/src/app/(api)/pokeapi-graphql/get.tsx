import { type NextRequest, NextResponse } from "next/server";
import getPokemonQuery from "../_graphqlFunctions/queries/getPokeAPI";

export default async function GET(request: NextRequest): Promise<NextResponse> {
  // get the pokemon name from the request
  const name = request.nextUrl.searchParams.get("name");
  const query = getPokemonQuery(name);

  try {
    // get pokemon from pokeapi graphql
    const res = await fetch("https://beta.pokeapi.co/graphql/v1beta", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Method-Used": "graphiql",
      },
      body: JSON.stringify({ query }),
    });

    // convert response to json
    const data = await res.json();

    // print out our requested data from pokeapi
    console.log(data.data);

    // return the pokemon in the response
    return NextResponse.json({ data: data.data, ok: true });
  } catch (err) {
    return NextResponse.json({ data: { err }, ok: false });
  }
}
