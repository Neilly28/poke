const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const PokemonModel = require("./models/Pokemon");
const userRoutes = require("./routes/user");

require("dotenv").config(); //Keep this at top of your file

// allow to connect with react
const cors = require("cors");

app.use(express.json());
app.use(cors());

// 68jPGAYuAFl2tvjT
// "mongodb+srv://neilpilarca:68jPGAYuAFl2tvjT@cluster0.47fqr7u.mongodb.net/test"
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongo connection open to MERN!");
  })
  .catch((err) => {
    console.log("oh no error!!");
    console.log(err);
  });

// UserModel.create({
//   name: "Jam",
//   age: 28,
//   username: "tuyami",
// })
//   .then(() => {
//     console.log("new product created!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.get("/getUsers", (req, res) => {
  UserModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/createUser", async (req, res) => {
  const user = req.body;
  console.log(user);
  const newUser = new UserModel(user);
  await newUser.save();
  res.json(user);
});

app.get("/getPokemon", (req, res) => {
  PokemonModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

// UserModel.create({
//   email: "jam@gmail.com",
//   password: "jam1234",
// })
//   .then(() => {
//     console.log("new user and password created!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const monsters = [
//   {
//     name: "Ultrasaur",
//     abilities: ["Kill", "Eat"],
//     stats: {
//       hp: 999,
//       attack: 9000,
//       defense: 500,
//       speed: 100,
//     },
//   },
//   {
//     name: "Chimera",
//     abilities: ["Fire Breath", "Poison Tail"],
//     stats: {
//       hp: 1500,
//       attack: 1200,
//       defense: 800,
//       speed: 300,
//     },
//   },
//   {
//     name: "Leviathan",
//     abilities: ["Tidal Wave", "Whirlpool"],
//     stats: {
//       hp: 2000,
//       attack: 1000,
//       defense: 1200,
//       speed: 500,
//     },
//   },
//   {
//     name: "Behemoth",
//     abilities: ["Rampage", "Stomp"],
//     stats: {
//       hp: 3000,
//       attack: 2000,
//       defense: 1500,
//       speed: 200,
//     },
//   },
//   {
//     name: "Phoenix",
//     abilities: ["Flame Burst", "Phoenix Down"],
//     stats: {
//       hp: 1500,
//       attack: 800,
//       defense: 600,
//       speed: 800,
//     },
//   },
// ];

// PokemonModel.insertMany(monsters)
//   .then(() => {
//     console.log("NEW POKEMONSS CREATED!!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// PokemonModel.create({
//   name: "Ultrasaur",
//   abilities: ["Kill", "Eat"],
//   stats: {
//     hp: 999,
//     attack: 9000,
//     defense: 500,
//     speed: 100,
//   },
// })
//   .then(() => {
//     console.log("NEW POKEMON CREATED!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.post("/createPokemon", async (req, res) => {
  const poke = req.body;
  console.log(poke);
  const newPoke = new PokemonModel(poke);
  await newPoke.save();
  res.json(poke);
});

// routes
app.use("/api/user", userRoutes);

app.listen(8080, () => {
  console.log("server listening from port 8080");
});
