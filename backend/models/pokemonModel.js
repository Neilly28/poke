const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pokemonSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    abilities: {
      type: [String],
      required: true,
    },
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
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pokemon", pokemonSchema);
