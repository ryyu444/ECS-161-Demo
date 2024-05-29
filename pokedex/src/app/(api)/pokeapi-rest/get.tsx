import { type NextRequest, NextResponse } from "next/server";

export default async function GET(request: NextRequest): Promise<NextResponse> {
  // get name from our request
  const name = request.nextUrl.searchParams.get("name");

  try {
    // get pokemon from pokeapi rest
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // convert to json
    const data = await res.json();

    // print out our requested data from pokeapi
    console.log(data);

    // format to match graphql structure for simplicity in rendering
    const pokemon = {
      name: data.name,
      height: data.height,
      weight: data.weight,
      abilities: data.abilities.slice(0, 5).map((ability: any) => {
        return {
          ability: {
            name: ability.ability.name,
          },
        };
      }),
      types: data.types.slice(0, 5).map((type: any) => {
        return {
          type: {
            name: type.type.name,
          },
        };
      }),
      sprite: [{ sprites: data.sprites.front_default }],
    };

    return NextResponse.json({ data: { pokemon: [pokemon] }, ok: true });
  } catch (err) {
    return NextResponse.json({ data: { err }, ok: false });
  }
}
