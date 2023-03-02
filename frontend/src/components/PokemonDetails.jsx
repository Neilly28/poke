import React from "react";

const PokemonDetails = ({ pokemon }) => {
  return (
    <div>
      <h4> {pokemon.name} </h4>
      <p> {pokemon.abilities} </p>
      <p> {pokemon.hp} </p>
      <p> {pokemon.attack} </p>
      <p> {pokemon.defense} </p>
      <p> {pokemon.speed} </p>
      <p> {pokemon.createdAt} </p>
    </div>
  );
};

export default PokemonDetails;
