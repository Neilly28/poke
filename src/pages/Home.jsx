import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Home.module.css";

const Home = () => {
  const [characters, setCharacters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("https://pokeapi.co/api/v2/pokemon/");
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

        console.log(data);
        setCharacters(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const filteredCharacters = characters.filter((char) =>
    char.name.includes(searchTerm)
  );

  return (
    <>
      <div className="search">
        <input
          type="text"
          placeholder="find your favorite pokemon"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
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
    </>
  );
};

export default Home;
