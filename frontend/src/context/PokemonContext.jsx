import { useState, useEffect, createContext } from "react";

export const PokemonContext = createContext();

export const PokemonContextProvider = ({ children }) => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [flavorText, setFlavorText] = useState("");
  const [limit, setLimit] = useState(151);

  // cleanse flavortext
  const cleanUpFlavorText = (flavorText) => {
    const cleanedText = flavorText.replace(/[\r\n\f]+/g, " ");
    const normalizedText = cleanedText.replace(/[^\x00-\x7F]/g, "");
    const finalText = normalizedText.replace(/POKMON/gi, "Pokémon");
    return finalText.trim();
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      setLoading(true);
      setIsPending(true);

      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=905`
        );
        const data = await response.json();

        // fetch base pokemon data
        const pokemonData = await Promise.all(
          data.results.map(async (poke) => {
            const response = await fetch(poke.url);
            const data = await response.json();
            return {
              ...poke,
              image: data.sprites.other.home.front_default,
              id: data.id,
              types: data.types.map((type) => type.type.name),
              stats: data.stats.map((stat) => ({
                name: stat.stat.name,
                value: stat.base_stat,
              })),
            };
          })
        );

        // Fetch flavor text for each Pokemon
        await Promise.all(
          pokemonData.map(async (poke) => {
            try {
              const response = await fetch(
                `https://pokeapi.co/api/v2/pokemon-species/${poke.id}`
              );
              const data = await response.json();
              const flavorText = data.flavor_text_entries.find(
                (text) => text.language.name === "en"
              );
              if (flavorText) {
                const cleanedText = cleanUpFlavorText(flavorText.flavor_text);
                poke.text = cleanedText;
              } else {
                poke.text = "Flavor text not available.";
              }
            } catch (err) {
              console.log(err);
            }
          })
        );

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

    fetchPokemonData();
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
        pokemon,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
