const mongoose = require("mongoose");

const pokemonSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abilities: {
      type: [String],
      required: true,
    },
    stats: {
      hp: {
        type: Number,
        required: true,
      },
      attack: {
        type: Number,
        required: true,
      },
      defense: {
        type: Number,
        required: true,
      },
      speed: {
        type: Number,
        required: true,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

module.exports = Pokemon;
