const Pokemon = require("../models/pokemonModel");
const mongoose = require("mongoose");

// get all pokemons
const getPokemons = async (req, res) => {
  const pokemons = await Pokemon.find({}).sort({ createdAt: -1 });
  res.status(200).json(pokemons);
};

// get a single pokemon
const getPokemon = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Error Getting. No such Pokemon. Invalid Id." });
  }
  const pokemon = await Pokemon.findById(id);

  if (!pokemon) {
    return res.status(404).json({ error: "No such Pokemon" });
  }

  res.status(200).json(pokemon);
};

// create a new pokemon
const createPokemon = async (req, res) => {
  const { name, abilities, hp, attack, defense, speed } = req.body;

  // check for empty fields
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!abilities) {
    emptyFields.push("abilities");
  }
  if (!hp) {
    emptyFields.push("hp");
  }
  if (!attack) {
    emptyFields.push("attack");
  }
  if (!defense) {
    emptyFields.push("defense");
  }
  if (!speed) {
    emptyFields.push("speed");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields XXX", emptyFields });
  }

  console.log(emptyFields);

  //   add doc to db
  try {
    const pokemon = await Pokemon.create({
      name,
      abilities,
      hp,
      attack,
      defense,
      speed,
    });
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a pokemon
const deletePokemon = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Error Deleting. No such Pokemon. Invalid Id." });
  }

  const pokemon = await Pokemon.findOneAndDelete({ _id: id });

  if (!pokemon) {
    return res.status(400).json({ error: "No such Pokemon" });
  }

  res.status(200).json(pokemon);
};

// update a pokemon
const updatePokemon = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ error: "Error Updating. No such Pokemon. Invalid Id." });
  }

  const pokemon = await Pokemon.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!pokemon) {
    return res.status(400).json({ error: "No such Pokemon" });
  }

  res.status(200).json(pokemon);
};

module.exports = {
  getPokemons,
  getPokemon,
  createPokemon,
  deletePokemon,
  updatePokemon,
};
