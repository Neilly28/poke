const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// static signup method
// needs to be an async function. do NOT use arrow function! because of this keyword.
userSchema.statics.signup = async function (email, password) {
  // validation
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  }

  // check if email exists
  const exists = await this.findOne({ email });

  // if exists, throw error
  if (exists) {
    throw Error("Email already in use");
  }

  // if not, proceed with salt and hash
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  // create new record with email and password object
  const user = await this.create({ email, password: hash });

  return user;
};

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
