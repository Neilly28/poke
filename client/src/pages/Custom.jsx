import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Custom.module.css";

const Custom = () => {
  const [listOfPokemon, setListOfPokemon] = useState([]);
  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState(0);
  //   const [username, setUsername] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8080/getPokemon").then((res) => {
      console.log(res);
      setListOfPokemon(res.data);
    });
  }, []);

  //   const createUser = () => {
  //     axios
  //       .post("http://localhost:8080/createUser", {
  //         name,
  //         age,
  //         username,
  //       })
  //       .then((res) => {
  //         alert("user created!");
  //         setListOfUsers([...listOfUsers, { name, age, username }]);
  //       });
  //   };

  return (
    <>
      <h1 className={styles.heading}>CUSTOM POKEMON!</h1>
      <div className={styles.pokeList}>
        {listOfPokemon.map((poke) => {
          const { name, abilities, stats } = poke;
          return (
            <div className={styles.pokeCard}>
              <img src="" alt="" />
              <h1 className={styles.pokeName}>{name}</h1>
              <div className={styles.abilityList}>
                {abilities.map((ability) => {
                  return <h2 className={styles.ability}>{ability}</h2>;
                })}
              </div>
              <div className={styles.statList}>
                <h2 className={styles.stat}>Hp: {stats.hp}</h2>
                <h2 className={styles.stat}>Attack: {stats.attack}</h2>
                <h2 className={styles.stat}>Defense: {stats.defense}</h2>
                <h2 className={styles.stat}>Speed: {stats.speed}</h2>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Custom;
