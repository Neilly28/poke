const Pokemon = require("../models/Pokemon");

// create
const createPokemon = async (req, res, next) => {
  const newPokemon = new Pokemon(req.body);

  try {
    const savedPokemon = await newPokemon.save();
    res.status(200).json(savedPokemon);
  } catch (err) {
    next(err);
  }
};

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
