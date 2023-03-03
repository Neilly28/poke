import React from "react";
import { useEffect } from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PokemonDetails from "../components/PokemonDetails";
import PokemonForm from "../components/PokemonForm";

const MyPokemon = () => {
  const { pokemons, dispatch } = usePokemonsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch("/api/pokemons", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_POKEMONS", payload: json });
      }
    };

    if (user) {
      fetchPokemons();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1> My Pokemon </h1>
      {pokemons &&
        pokemons.map((pokemon) => {
          return <PokemonDetails key={pokemon._id} pokemon={pokemon} />;
        })}
      <PokemonForm />
    </div>
  );
};

export default MyPokemon;
