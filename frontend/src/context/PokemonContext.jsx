import { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const data = await response.json();
        console.log({ data });

        const pokemonData = await Promise.all(
          data.results.map(async (poke) => {
            const response = await fetch(poke.url);
            const data = await response.json();
            return {
              ...poke,
              image: data.sprites.other.home.front_default,
              id: data.id,
              types: data.types.map((type) => type.type.name),
            };
          })
        );
        console.log({ pokemonData });

        setPokemon(pokemonData);
        setIsPending(false);
        setError(null);
        setLoading(false);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const filteredPokemon = pokemon.filter((poke) =>
    poke.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PokemonContext.Provider
      value={{
        searchTerm,
        setSearchTerm,
        isPending,
        error,
        filteredPokemon,
        loading,
        setLoading,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
