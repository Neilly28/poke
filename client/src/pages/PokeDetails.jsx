import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./PokeDetails.module.css";

const PokeDetails = () => {
  const { id } = useParams();
  const [pokeDetails, setPokeDetails] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setPokeDetails(response.data);
        setIsPending(false);
        setError(null);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
        console.log(err);
      }
    };
    fetchDetails();
  }, [id]);

  return (
    <div className={styles.card}>
      {error && <div>{error}</div>}
      {isPending && <div>Loading...</div>}
      {pokeDetails && (
        <>
          <div className={styles.title}>{pokeDetails.name}</div>
          <img
            className={styles.image}
            src={pokeDetails.sprites.front_default}
            alt=""
          />

          <div className={styles.stats}>
            {pokeDetails.stats.map((poke) => {
              return (
                <div className={styles.stat} key={poke.stat.name}>
                  <div className={styles.statName}>{poke.stat.name}</div>
                  <div className={styles.statValue}>{poke.base_stat}</div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default PokeDetails;
