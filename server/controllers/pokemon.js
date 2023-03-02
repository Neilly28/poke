const Pokemon = require("../models/Pokemon");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// create a new workout
const createPokemon = async (req, res) => {
  const { name, abilities, stats } = req.body;

  let emptyFields = [];

  if (!name) {
    emptyFields.push("title");
  }
  if (!abilities) {
    emptyFields.push("load");
  }
  if (!stats) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add doc to db
  try {
    const user_id = req.user._id;
    const pokemon = await Pokemon.create({ name, abilities, stats, user_id });
    res.status(200).json(pokemon);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// create
// const createPokemon = async (req, res, next) => {
//   const newPokemon = new Pokemon(req.body);

//   try {
//     const user_id = req.user._id;
//     newPokemon.user = user_id; // Add the user id to the new Pokemon
//     const savedPokemon = await newPokemon.save();
//     res.status(200).json(savedPokemon);
//     console.log("NEW POKEMON CREATED!");
//   } catch (err) {
//     next(err);
//   }
// };

// update
const updatePokemon = async (req, res, next) => {
  try {
    const updatedPokemon = await Pokemon.findByIdAndUpdate(req.params.id, {
      $set: req.body,
      new: true,
    });
    res.status(200).json(updatedPokemon);
  } catch (err) {
    next(err);
  }
};

// delete
const deletePokemon = async (req, res, next) => {
  try {
    await Pokemon.findByIdAndDelete(req.params.id);
    res.status(200).json("Pokemon has been deleted!");
  } catch (err) {
    next(err);
  }
};

// get Pokemon
const getPokemon = async (req, res, next) => {
  try {
    const Pokemon = await Pokemon.findById(req.params.id);
    res.status(200).json(Pokemon);
  } catch (err) {
    next(err);
  }
};

// get all Pokemons
const getPokemons = async (req, res, next) => {
  try {
    const Pokemons = await Pokemon.find();
    res.status(200).json(Pokemons);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemon,
  getPokemons,
};
