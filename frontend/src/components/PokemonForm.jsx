import React from "react";
import { useState } from "react";

const PokemonForm = () => {
  const [name, setName] = useState("");
  const [abilities, setAbilities] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pokemon = { name, abilities, hp, attack, defense, speed };
    const response = await fetch("/api/pokemons", {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setName("");
      setAbilities("");
      setHp("");
      setAbilities("");
      setAttack("");
      setDefense("");
      setSpeed("");
      setError(null);
      console.log("New Pokemon Added", json);
    }
  };

  return (
    <div>
      <form action="" onSubmit={handleSubmit}>
        <h3>Add a new Pokemon</h3>
        <label>Pokemon Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <label>Abilities:</label>
        <input
          type="text"
          onChange={(e) => setAbilities(e.target.value)}
          value={abilities}
        />
        <label>Hp:</label>
        <input type="text" onChange={(e) => setHp(e.target.value)} value={hp} />
        <label>Attack:</label>
        <input
          type="text"
          onChange={(e) => setAttack(e.target.value)}
          value={attack}
        />
        <label>Defense:</label>
        <input
          type="text"
          onChange={(e) => setDefense(e.target.value)}
          value={defense}
        />
        <label>Speed:</label>
        <input
          type="text"
          onChange={(e) => setSpeed(e.target.value)}
          value={speed}
        />
        <button>Add Pokemon</button>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default PokemonForm;
