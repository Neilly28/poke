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
    <div className="flex flex-col justify-center items-center">
      <div className="grid grid-cols-3 mt-20 mx-auto justify-center max-w-5xl mb-20">
        <div className="flex flex-col justify-center items-center">
          <div className="font-bold text-lg capitalize">#9999</div>
          <img
            className="w-32 p-4"
            src="https://www.pngfind.com/pngs/m/213-2138431_pokemon-pikachu-pixel-art-pixelated-cute-adorable-pixel.png"
            alt=""
          />
          <div className="font-bold text-lg capitalize mb-4">
            {pokemon.name}
          </div>

          <div className="flex gap-4">
            {pokemon.types.map((type) => {
              return (
                <div className="bg-black text-yellow-400 border border-black p-2">
                  <h2 className="capitalize"> {type} </h2>
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          {Object.keys(pokemon.stats).map((stat) => {
            return (
              <div className="grid grid-cols-2">
                <div className="capitalize mb-3 mr-4 font-bold">
                  {"special-" + stat}:
                </div>
                <div className="capitalize mb-3">{pokemon.stats[stat]}</div>
              </div>
            );
          })}
        </div>
        <div className="flex flex-col gap-4">
          <div>
            <h2 className="font-bold">Abilities</h2>
          </div>
          {pokemon.abilities.map((poke) => {
            return (
              <h2 className="capitalize bg-black text-yellow-400 border border-black p-2 w-1/2">
                {poke}
              </h2>
            );
          })}
        </div>
      </div>
      <button onClick={handleClick}>Delete Pokemon</button>
    </div>
  );
};

export default PokemonDetails;
