import { useState, useEffect } from "react";
import axios from "axios";
// import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import useFetch from "../components/useFetch";

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
        <div className="grid grid-cols-5 max-w-7xl gap-20 justify-center items-center">
          {filteredCharacters.map((char) => {
            return (
              <Link to={`/poke/${char.id}`}>
                <div
                  className="flex flex-col justify-center items-center overflow-hidden"
                  key={char.id}
                >
                  {/* <h2 className="font-bold text-xs mb-5">#{char.id}</h2> */}
                  <img
                    src={char.sprites.other.dream_world.front_default}
                    alt=""
                    className="h-28 w-full object-cover"
                  />
                  <h2 className="font-bold text-lg capitalize">{char.name}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
