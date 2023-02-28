import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Cards.module.css";

// require("dotenv").config();

const Cards = () => {
  const api_key = process.env.API_KEY;

  //   const card_id = "xy1-1";
  const [url, setUrl] = useState([]);
  const [image, setImage] = useState("");

  useEffect(() => {
    axios
      .get(`https://api.pokemontcg.io/v2/cards?q=set.id:base1`, {
        headers: {
          "X-Api-Key": api_key,
        },
      })
      .then((response) => {
        // Handle success response here
        console.log(response.data);
        setUrl(response.data.data);
        // setUrl(allPokemon);
        // setImage(response.data.data[0].images.small);
      })
      .catch((error) => {
        // Handle error response here
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h1>hello from cards!</h1>
      <div className="grid grid-cols-5 grid-rows-5 gap-9">
        {url.map((poke) => {
          return (
            <div className={styles.cardWrapper}>
              <div className={styles.card}>
                <img src={poke.images.small} alt="" className={styles.img} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
