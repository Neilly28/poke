require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const pokemonRoutes = require("./routes/pokemons");
const userRoutes = require("./routes/user");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/pokemons", pokemonRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening from port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
