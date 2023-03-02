import React from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";

const PokemonDetails = ({ pokemon }) => {
  const { dispatch } = usePokemonsContext();

  const handleClick = async () => {
    const response = await fetch("/api/pokemons/" + pokemon._id, {
      method: "DELETE",
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_POKEMON", payload: json });
    }
  };
  return (
    <div>
      <h4> {pokemon.name} </h4>
      <p> {pokemon.abilities} </p>
      <p> {pokemon.hp} </p>
      <p> {pokemon.attack} </p>
      <p> {pokemon.defense} </p>
      <p> {pokemon.speed} </p>
      <p> {pokemon.createdAt} </p>
      <span onClick={handleClick}>delete</span>
    </div>
  );
};

export default PokemonDetails;
