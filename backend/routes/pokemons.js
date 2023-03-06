const express = require("express");
const {
  getPokemon,
  getPokemons,
  createPokemon,
  deletePokemon,
  updatePokemon,
} = require("../controllers/pokemonController");

// require auth for all pokemon routes
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// GET all pokemons
router.get("/", getPokemons);

// GET a single pokemon
router.get("/:id", getPokemon);

// POST a new pokemon
router.post("/", createPokemon);

// DELETE a pokemon
router.delete("/:id", deletePokemon);

// UPDATE a pokemon
router.patch("/:id", updatePokemon);

module.exports = router;
