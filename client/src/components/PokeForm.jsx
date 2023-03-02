import React from "react";
import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePokemonContext } from "../hooks/usePokeContext";

function PokeForm() {
  const { dispatch } = usePokemonContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [abilities, setAbilities] = useState([]);
  const [stats, setStats] = useState({
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
  });
  const [error, setError] = useState(null);
  const [newPokemon, setNewPokemon] = useState(null);

  //   useEffect(() => {
  //     if (newPokemon) {
  //       setStats({
  //         hp: Math.floor(Math.random() * 100),
  //         attack: Math.floor(Math.random() * 100),
  //         defense: Math.floor(Math.random() * 100),
  //         speed: Math.floor(Math.random() * 100),
  //       });
  //     }
  //   }, [newPokemon]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return;
    }

    const newStats = {
      hp: Math.floor(Math.random() * 100),
      attack: Math.floor(Math.random() * 100),
      defense: Math.floor(Math.random() * 100),
      speed: Math.floor(Math.random() * 100),
    };
    setStats(newStats);
    const newPokemonObj = {
      name,
      abilities,
      stats: newStats,
    };
    setNewPokemon(newPokemonObj);

    const headers = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST,PATCH,OPTIONS",
      "Access-Control-Allow-Origin": "http://localhost:8080/api/pokemon",
      Authorization: `Bearer ${user.token}`,
    };

    const pokemon = { name, abilities, stats };

    const response = await fetch("http://localhost:8080/api/pokemon", {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: headers,
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      dispatch({ type: "CREATE_POKEMON", payload: json });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />
        <label>
          Abilities:
          <input
            type="text"
            value={abilities.join(",")}
            onChange={(e) => setAbilities(e.target.value.split(","))}
          />
        </label>
        <br />
        {/* <label>Stats:</label>
        <ul>
          <li>HP: {stats.hp}</li>
          <li>Attack: {stats.attack}</li>
          <li>Defense: {stats.defense}</li>
          <li>Speed: {stats.speed}</li>
        </ul> */}
        <button>Create Pokemon</button>
        {error && <div className="error">{error}</div>}
      </form>
      {newPokemon && (
        <div>
          <h2>New Pokemon:</h2>
          <p>Name: {newPokemon.name}</p>
          <p>Abilities: {newPokemon.abilities.join(", ")}</p>
          <ul>
            <li>HP: {newPokemon.stats.hp}</li>
            <li>Attack: {newPokemon.stats.attack}</li>
            <li>Defense: {newPokemon.stats.defense}</li>
            <li>Speed: {newPokemon.stats.speed}</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default PokeForm;
