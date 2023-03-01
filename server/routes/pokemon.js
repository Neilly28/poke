const express = require("express");

const {
  createPokemon,
  updatePokemon,
  deletePokemon,
  getPokemon,
  getPokemons,
} = require("../controllers/pokemon");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

// require authentication before accessing any route
router.use(requireAuth);

// create
router.post("/", createPokemon);

// update
router.put("/:id", updatePokemon);

// delete
router.delete("/:id", deletePokemon);

// get
router.get("/:id", getPokemon);

// get all
router.get("/", getPokemons);

module.exports = router;
