import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
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
    <div className={styles.hero}>
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Find your favorite Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div>
        <div className="grid grid-cols-3 grid-rows-5 max-w-4xl">
          {filteredCharacters.map((char) => {
            return (
              <Link to={`/poke/${char.id}`}>
                <div
                  className="flex flex-col justify-center items-center p-8 rounded-lg m-4 bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border border-gray-800"
                  key={char.id}
                >
                  <h2 className="text-[#1c2c5c] font-bold text-xs">
                    #{char.id}
                  </h2>
                  <img
                    src={char.sprites.other.dream_world.front_default}
                    alt=""
                    className="w-3/4"
                  />
                  <h2 className="text-[#1c2c5c] font-bold text-lg capitalize">
                    {char.name}
                  </h2>
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
