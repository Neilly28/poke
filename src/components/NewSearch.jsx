import React from "react";
import styles from "./Search.module.css";

import { useState, useEffect } from "react";
import axios from "axios";

const Search = () => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (!name) {
      return;
    }
    setLoading(true);
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then((res) => {
        setImage(res.data.sprites.front_default);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [name]);

  return (
    <>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Find your favorite Pokemon..."
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>

      <div className="poke-display">
        {loading ? (
          <p>Loading...</p>
        ) : image ? (
          <div className="poke-card">
            <h1>{name}</h1>
            <img src={image} alt="" />
          </div>
        ) : (
          <p>No image found</p>
        )}
      </div>
    </>
  );
};

const NewSearch = ({ placeholder, data }) => {
  return (
    <div className="search">
      <div className="searchInput">
        <input type="text" placeholder={placeholder} />
        <div className="searchIcon"></div>
      </div>
      <div className="dataResult"></div>
    </div>
  );
};

export default NewSearch;
