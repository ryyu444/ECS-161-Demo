export default function getPokemonQuery(name: String | null) {
  name = name === null ? "empoleon" : name;

  return `query getPokeAPI {
      pokemon: pokemon_v2_pokemon(where: { name: { _eq: "${name}" } }) {
        name
        height
        weight
        abilities: pokemon_v2_pokemonabilities(limit: 5) {
          ability: pokemon_v2_ability {
            name
          }
        }
        types: pokemon_v2_pokemontypes(limit: 5) {
          type: pokemon_v2_type {
            name
          }
        }
        sprite: pokemon_v2_pokemonsprites(limit: 5) {
          sprites(path: "front_default")
        }
      }
    }
  `;
}
