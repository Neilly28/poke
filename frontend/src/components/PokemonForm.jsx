import React from "react";
import { useState } from "react";
import { usePokemonsContext } from "../hooks/usePokemonsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const PokemonForm = () => {
  const { dispatch } = usePokemonsContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [abilities, setAbilities] = useState("");
  const [hp, setHp] = useState("");
  const [attack, setAttack] = useState("");
  const [defense, setDefense] = useState("");
  const [speed, setSpeed] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }
    const pokemon = { name, abilities, hp, attack, defense, speed };
    const response = await fetch("/api/pokemons", {
      method: "POST",
      body: JSON.stringify(pokemon),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
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
      setEmptyFields([]);
      console.log("New Pokemon Added", json);
      dispatch({ type: "CREATE_POKEMON", payload: json });
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
          // className={emptyFields.includes("name") ? "styles.error" : ""}
        />
        <label>Abilities:</label>
        <input
          type="text"
          onChange={(e) => setAbilities(e.target.value)}
          value={abilities}
          // className={emptyFields.includes("abilities") ? "error" : ""}
        />
        <label>Hp:</label>
        <input type="text" onChange={(e) => setHp(e.target.value)} value={hp} />
        {/* className={emptyFields.includes("hp") ? "error" : ""} */}
        <label>Attack:</label>
        <input
          type="text"
          onChange={(e) => setAttack(e.target.value)}
          value={attack}
          // className={emptyFields.includes("attack") ? "error" : ""}
        />
        <label>Defense:</label>
        <input
          type="text"
          onChange={(e) => setDefense(e.target.value)}
          value={defense}
          // className={emptyFields.includes("defense") ? "error" : ""}
        />
        <label>Speed:</label>
        <input
          type="text"
          onChange={(e) => setSpeed(e.target.value)}
          value={speed}
          // className={emptyFields.includes("speed") ? "error" : ""}
        />
        <button>Add Pokemon</button>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

export default PokemonForm;
