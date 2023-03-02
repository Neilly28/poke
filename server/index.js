require("dotenv").config(); //Keep this at top of your file

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");
const PokemonModel = require("./models/Pokemon");
const userRoutes = require("./routes/user");
const pokemonRoutes = require("./routes/pokemon");

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// allow to connect with react
// const cors = require("cors");

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

// middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use(express.json());
// app.use(cors());

// routes
app.use("/api/user", userRoutes);

app.use("/api/pokemon", pokemonRoutes);

app.listen(process.env.PORT, () => {
  console.log("server listening from port " + process.env.PORT);
});
