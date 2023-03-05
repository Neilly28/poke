import React from "react";
import { useEffect, useState } from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useAuthContext } from "../hooks/useAuthContext";

// components
import PokemonDetails from "../components/PokemonDetails";
import PokemonForm from "../components/PokemonForm";
import Ai from "../components/useAi";

const MyPokemon = () => {
  const { pokemons, dispatch } = usePokemonsContext();
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPokemons = async () => {
      setIsLoading(true);

      try {
        const response = await fetch("/api/pokemons", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({ type: "SET_POKEMONS", payload: json });
        } else {
          throw new Error(json.message);
        }
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchPokemons();
    }
  }, [dispatch, user]);

  return (
    <div>
      <h1>My Pokemon</h1>

      {error ? (
        <p>An error occurred: {error}</p>
      ) : isLoading ? (
        <p>Loading...</p>
      ) : pokemons && pokemons.length ? (
        pokemons.map((pokemon) => {
          return <PokemonDetails key={pokemon._id} pokemon={pokemon} />;
        })
      ) : (
        <p>Trainer, you don't have any Pokemon in your collection yet</p>
      )}

      <PokemonForm />
      <Ai />
    </div>
  );
};

export default MyPokemon;
