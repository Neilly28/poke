import React from "react";
import Card from "../Card";
import Pokeinfo from "../Pokeinfo";
import { useState, useEffect } from "react";
import axios from "axios";

const Main = () => {
  const [pokeData, setPokeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
  const [nextUrl, setNextUrl] = useState();
  const [prevUrl, setPrevUrl] = useState();
  const [pokeDex, setPokeDex] = useState("");

  const pokeFun = async () => {
    setLoading(true);
    const res = await axios.get(url);
    // get individual pokemon pass it as argument
    getPokemon(res.data.results);
    setNextUrl(res.data.next);
    setPrevUrl(res.data.previous);
    setLoading(false);
  };

  //   res.data.results is now results argument
  const getPokemon = async (results) => {
    // get the individual urls
    results.map(async (item) => {
      const result = await axios.get(item.url);

      //   set pokedata to the result.data which contains all info
      setPokeData((currentData) => {
        const newData = [...currentData, result.data];
        newData.sort((a, b) => (a.id > b.id ? 1 : -1));
        return newData;
      });
    });
  };

  let initialized = false;

  useEffect(() => {
    if (!initialized) {
      initialized = true;
      pokeFun();
    }
  }, [url]);

  return (
    <>
      <div className="container">
        <div className="left-content">
          {/* pass pokemon as props */}
          <Card
            pokemon={pokeData}
            loading={loading}
            // infopokemon with poke payload from card..
            infoPokemon={(poke) => setPokeDex(poke)}
          />

          <button
            onClick={() => {
              setPokeData([]);
              setUrl(prevUrl);
            }}
          >
            Previous
          </button>
          <button
            onClick={() => {
              setPokeData([]);
              setUrl(nextUrl);
            }}
          >
            Next
          </button>
        </div>
        <div className="right-content">
          {/* pokedex is sent to pokeinfo as props */}
          <Pokeinfo data={pokeDex} />
        </div>
      </div>
    </>
  );
};

export default Main;
