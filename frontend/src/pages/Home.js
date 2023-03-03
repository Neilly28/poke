import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";
import Masonry from "react-responsive-masonry";
import { Fade } from "react-awesome-reveal";

const Home = () => {
  const {
    characters,
    searchTerm,
    setSearchTerm,
    isPending,
    error,
    filteredCharacters,
  } = useFetch("https://pokeapi.co/api/v2/pokemon?limit=151");

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="mb-20">
        <input
          type=""
          placeholder="Find your favorite Poké..."
          className="p-2 mt-8 bg-transparent border-b-2 border-black focus:border-black outline-none placeholder-black"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <div className="grid grid-cols-3 max-w-8xl gap-20 justify-center items-center">
          {filteredCharacters.map((char) => {
            return (
              <Fade>
                <Link to={`/poke/${char.id}`}>
                  <div
                    className="flex flex-col justify-center items-center overflow-hidden p-8 opacity-90"
                    key={char.id}
                  >
                    <h2 className="font-bold text-xs mb-5">#{char.id}</h2>

                    <img
                      // src={char.sprites.other.dream_world.front_default}
                      src={char.sprites.front_default}
                      // src={char.sprites.other.home.front_default}
                      alt={char.name}
                    />

                    <h2 className="font-bold text-lg capitalize">
                      {char.name}
                    </h2>
                    {char.abilities.map((poke) => {
                      return (
                        <div>
                          <h3> {poke[0]} </h3>
                        </div>
                      );
                    })}
                  </div>
                </Link>
              </Fade>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
