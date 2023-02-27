const express = require("express");
const app = express();
const mongoose = require("mongoose");
const UserModel = require("./models/User");

// allow to connect with react
const cors = require("cors");

app.use(express.json());
app.use(cors());

// 68jPGAYuAFl2tvjT
// "mongodb+srv://neilpilarca:68jPGAYuAFl2tvjT@cluster0.47fqr7u.mongodb.net/test"
mongoose
  .connect(
    "mongodb+srv://neilpilarca:68jPGAYuAFl2tvjT@cluster0.47fqr7u.mongodb.net/mern-tutorial-db"
  )
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

app.listen(8080, () => {
  console.log("server listening from port 8080");
});
