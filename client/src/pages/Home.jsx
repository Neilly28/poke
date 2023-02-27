import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";
// import { Link } from "react-router-dom";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=151"
        );
        const arr = res.data.results;
        const url = arr.map((item) => {
          return item.url;
        });

        // Fetch data for each URL
        const data = await Promise.all(
          url.map(async (itemUrl) => {
            const itemRes = await axios.get(itemUrl);
            return itemRes.data;
          })
        );

        setCharacters(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="hero">
      <div className="search">
        <input
          type="text"
          placeholder="Find your favorite Pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="poke-container">
        <div className={styles["card-container"]}>
          {filteredCharacters.map((char) => {
            return (
              <div className={styles.card}>
                <h1>{char.name}</h1>
                <img src={char.sprites.front_default} alt="" />
              </div>
            );
          })}
        </div>
        <div className="poke-info">hello!</div>
      </div>
    </div>
  );
};

export default Home;