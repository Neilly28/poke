import React, { useState, useEffect } from "react";
import { resolvePath, useParams, Link } from "react-router-dom";
import axios from "axios";
// import styles from "./PokeDetails.module.css";
// import Typewriter from "typewriter-effect";
import TypeWriterEffect from "react-typewriter-effect";

const PokemonDetails = () => {
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);
  const [evo, setEvo] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        const text = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${id}`
        );
        // const resevo = await axios.get(
        //   `https://pokeapi.co/api/v2/evolution-chain/${id}`
        // );
        setPokeDetails(response.data);

        const rng = Math.floor(
          Math.random() * text.data.flavor_text_entries.length - 1
        );
        setText(text.data.flavor_text_entries[rng].flavor_text);

        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <div className="grid grid-cols-3 mt-20 mx-auto justify-center max-w-5xl mb-20">
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
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <h2 className="font-bold">Abilities</h2>
                </div>
                {pokeDetails.abilities.map((poke) => {
                  return (
                    <h2 className="capitalize bg-black text-yellow-400 border border-black p-2 w-1/2">
                      {poke.ability.name}
                    </h2>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <TypeWriterEffect
          startDelay={100}
          cursorColor="black"
          text={text}
          typeSpeed={30}
          textStyle={{
            fontFamily: "Poppins",
            fontWeight: 400,
            fontSize: "1em",
          }}
        />
      </div>
    </div>
  );
};

export default PokemonDetails;
