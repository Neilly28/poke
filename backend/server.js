require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const pokemonRoutes = require("./routes/pokemons");
const userRoutes = require("./routes/user");

// ai routes
const postRoutes = require("./routes/postRoutes");
const dalleRoutes = require("./routes/dalleRoutes");

// express app
const app = express();

// middleware

app.use(express.json({ limit: "50mb" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/pokemons", pokemonRoutes);
app.use("/api/user", userRoutes);

// ai routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/dalle", dalleRoutes);

// message for deployment
app.get("/", async (req, res) => {
  res.status(200).json({
    message: "Hello from Pokehack!",
  });
});

// connect to db
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    // listen for requests
    app.listen(4000, () => {
      console.log("connected to db & listening from port 4000");
    });
  })
  .catch((error) => {
    console.log(error);
  });
