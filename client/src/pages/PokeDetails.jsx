import React, { useState, useEffect } from "react";
import { resolvePath, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PokeDetails.module.css";

const PokeDetails = () => {
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [evo, setEvo] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const resevo = await axios.get(
          `https://pokeapi.co/api/v2/evolution-chain/${id}`
        );
        setPokeDetails(response.data);
        console.log("EVOLUTION HERE!!!");
        console.log(resevo.data);
        console.log(resevo.data.chain.evolves_to[0].species.name);
        setEvo(resevo.data.chain.evolves_to[0].species.name);
        setIsPending(false);
        setError(null);
        console.log("HELELEOO!!!");
        console.log(response.data);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className="grid grid-cols-3 mt-20 mx-auto justify-center max-w-5xl">
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pokeDetails && (
        <>
          <div className="flex flex-col justify-center items-center">
            <div className="font-bold text-lg capitalize">
              #{pokeDetails.id}
            </div>
            <img src={pokeDetails.sprites.front_default} alt="" />
            <div className="font-bold text-lg capitalize mb-4">
              {pokeDetails.name}
            </div>
            <div className="flex gap-4">
              {pokeDetails.types.map((poke) => {
                return (
                  <div className="bg-black text-yellow-400 border border-black p-2">
                    <h2 className="capitalize"> {poke.type.name} </h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            {pokeDetails.stats.map((poke) => {
              return (
                <div className="grid grid-cols-2">
                  <div className="capitalize mb-3 mr-4 font-bold">
                    {poke.stat.name}:
                  </div>
                  <div className="capitalize mb-3">{poke.base_stat}</div>
                </div>
              );
            })}
            <div className="flex gap-4">
              {pokeDetails.abilities.map((poke) => {
                return (
                  <div className="bg-black text-yellow-400 border border-black p-2">
                    <h2 className="capitalize"> {poke.ability.name} </h2>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex gap-2">
            <h1> {evo} </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default PokeDetails;
