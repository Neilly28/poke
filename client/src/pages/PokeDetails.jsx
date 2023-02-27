import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PokeDetails = () => {
  const [pokeDetails, setPokeDetails] = useState("");
  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    axios.get("https://pokeapi.co/api/v2/pokemon/" + id).then((res) => {
      console.log("RES DATA HERE!");
      console.log(res.data);
      setPokeDetails(res.data);
      console.log("POKEDEATILS");
      console.log(pokeDetails);
    });
  }, []);

  return (
    <div>
      <h1> {pokeDetails.name} </h1>
      {/* <img src={pokeDetails.sprites.front_default} alt="" /> */}
      {/* <img src={pokeDetails.sprites.front_default} alt="" /> */}
      {/* {pokeDetails.abilities.map((poke) => {
        return <h2> {poke} </h2>;
      })} */}
    </div>
  );
};

export default PokeDetails;
