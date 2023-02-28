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
      <div className="text-[#FF9494]">
        <div className={styles["card-container"]}>
          {filteredCharacters.map((char) => {
            return (
              <div className={styles.card} key={char.id}>
                <Link to={`/poke/${char.id}`}>
                  <h1>{char.id}</h1>
                  <h1>{char.name}</h1>
                  <img src={char.sprites.front_default} alt="" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
