import React from "react";
import { useEffect, useState } from "react";
import PokemonDetails from "../components/PokemonDetails";
import PokemonForm from "../components/PokemonForm";

const Home = () => {
  const [pokemons, setPokemons] = useState(null);
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("/api/pokemons");
      const json = await response.json();

      if (response.ok) {
        setPokemons(json);
      }
    };
    fetchPokemons();
  }, []);

  return (
    <div>
      {pokemons &&
        pokemons.map((pokemon) => {
          return <PokemonDetails key={pokemon._id} pokemon={pokemon} />;
        })}
      <PokemonForm />
    </div>
  );
};

export default Home;
