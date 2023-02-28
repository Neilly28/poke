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
      <div className="text-[#F9F7F7]">
        <div className="grid grid-cols-5 grid-rows-5">
          {filteredCharacters.map((char) => {
            return (
              <Link to={`/poke/${char.id}`}>
                <div
                  className="flex flex-col justify-center items-center p-8 rounded-md m-4 bg-[#112D4E]"
                  key={char.id}
                >
                  <h2 className="mb-10 text-lg">#{char.id}</h2>
                  <img
                    src={char.sprites.other.dream_world.front_default}
                    alt=""
                    className="mb-10"
                  />
                  <h2 className="text-2xl capitalize">{char.name}</h2>
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
