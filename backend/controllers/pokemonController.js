const Pokemon = require("../models/pokemonModel");
const mongoose = require("mongoose");

// get all pokemons
const getPokemons = async (req, res) => {
  // get only pokemon that was created by the logged in user
  const user_id = req.user._id;
  const pokemons = await Pokemon.find({ user_id }).sort({ createdAt: -1 });
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
  const { name, types, stats, abilities } = req.body;

  // check for empty fields
  let emptyFields = [];
  if (!name) {
    emptyFields.push("name");
  }
  if (!types) {
    emptyFields.push("types");
  }
  if (!stats.hp) {
    emptyFields.push("stats.hp");
  }

  if (!stats.attack) {
    emptyFields.push("stats.attack");
  }

  if (!stats.defense) {
    emptyFields.push("stats.defense");
  }

  if (!stats.speed) {
    emptyFields.push("stats.speed");
  }

  if (!abilities) {
    emptyFields.push("abilities");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields XXX", emptyFields });
  }

  // console.log(emptyFields);

  //   add doc to db
  try {
    const user_id = req.user._id;
    const pokemon = await Pokemon.create({
      name,
      types,
      stats: {
        hp: stats.hp,
        attack: stats.attack,
        defense: stats.defense,
        speed: stats.speed,
      },
      abilities,
      user_id,
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
