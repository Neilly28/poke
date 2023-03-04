import React from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const PokemonDetails = ({ pokemon }) => {
  const { dispatch } = usePokemonsContext();
  const { user } = useAuthContext();

  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/pokemons/" + pokemon._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POKEMON", payload: json });
    }
  };
  return (
    <div>
      <h1> {pokemon.name} </h1>
      <h2> {pokemon.user_id} </h2>
    </div>
  );
};

export default PokemonDetails;
