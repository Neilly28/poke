import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Custom.module.css";
import { useAuthContext } from "../hooks/useAuthContext";
import PokeForm from "../components/PokeForm";

const Custom = () => {
  const { user } = useAuthContext();
  const [listOfPokemon, setListOfPokemon] = useState([]);
  //   const [name, setName] = useState("");
  //   const [age, setAge] = useState(0);
  //   const [username, setUsername] = useState("");

  useEffect(() => {
    if (user) {
      axios
        .get("http://localhost:8080/api/pokemon", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((res) => {
          console.log(res);
          setListOfPokemon(res.data);
        });
    }
  }, [user]);

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
      <PokeForm />
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
