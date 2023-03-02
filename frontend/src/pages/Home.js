import React from "react";
import { useEffect } from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";

// components
import PokemonDetails from "../components/PokemonDetails";
import PokemonForm from "../components/PokemonForm";

const Home = () => {
  const { pokemons, dispatch } = usePokemonsContext();
  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("/api/pokemons");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POKEMONS", payload: json });
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
