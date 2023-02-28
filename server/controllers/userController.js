const User = require("../models/User");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// login user
const loginUser = async (req, res) => {
  // grab email and password from request body from the POST request
  const { email, password } = req.body;

  try {
    // call the custom login method. if successful, send back 200 and object.
    const user = await User.login(email, password);

    // create token
    const token = createToken(user._id);

    // send back success message
    res.status(200).json({ email, token });

    // if error, send error message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  // grab email and password from request body from the POST request
  const { email, password } = req.body;

  try {
    // call the custom signup method. if successful, send back 200 and object.
    const user = await User.signup(email, password);

    // create token
    const token = createToken(user._id);

    // send back success message
    res.status(200).json({ email, token });

    // if error, send error message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.json({ msg: "signup user" });
};

module.exports = { signupUser, loginUser };
