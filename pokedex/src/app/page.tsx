"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import typeColors from "@/app/data/types.json";
import styles from "./page.module.scss";

async function fetchPokemon(name: string | undefined) {
  // graphql query
  // const res = await fetch(`/pokeapi-graphql?name=${name}`);

  // rest api call
  const res = await fetch(`/pokeapi-rest?name=${name}`);

  // convert to json
  const data = await res.json();

  // error checking
  if (!data.ok) {
    return null;
  }

  // return retrieved pokemon
  return data.data.pokemon[0];
}

export default function Home() {
  const [pokemon, setPokemon] = useState<any>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  // initial fetch of a pokemon
  useEffect(() => {
    fetchPokemon("ditto").then((data) => setPokemon(data));
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get pokemon name from input
    const name = nameRef.current?.value.toLowerCase();

    // get pokemon data
    const data = await fetchPokemon(name);

    // set pokemon data
    if (data) {
      setPokemon(data);
    }
  }

  // console.log(pokemon);

  return (
    <main className={styles.home}>
      <section className={styles.card}>
        <h1>Budget Pokedex</h1>
        <div className={styles.cardTop}>
          <div className={styles.pokeHeader}>
            <div className={styles.pokeName}>{pokemon?.name}</div>
            <Image
              src={pokemon?.sprite[0].sprites}
              className={styles.pokeImg}
              width={250}
              height={250}
              alt={"Pokemon Image"}
            />
          </div>

          <ul className={styles.pokeTypes}>
            {pokemon?.types?.map((type: any) => (
              <li
                key={type.type.name}
                style={{
                  backgroundColor: typeColors[type.type.name],
                  padding: "8px",
                  borderRadius: "4px",
                  color: "white",
                  fontSize: "1.2rem",
                  minWidth: "50px",
                  textAlign: "center",
                  textTransform: "capitalize",
                }}
              >
                {type.type.name}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.cardBottom}>
          <ul className={styles.pokeAbilities}>
            {pokemon?.abilities?.map((ability: any) => (
              <li key={ability.ability.name} className={styles.pokeAbility}>
                {ability.ability.name}
              </li>
            ))}
          </ul>
          <div className={styles.pokeStats}>
            <p>Height: {pokemon?.height}m</p>
            <p>Weight: {pokemon?.weight}lb</p>
          </div>
        </div>
      </section>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.formInput}>
          <label htmlFor="name">Pokemon</label>
          <input type="text" placeholder="i.e Pikachu" ref={nameRef} />
        </div>
        <button type="submit">Search</button>
      </form>
    </main>
  );
}
