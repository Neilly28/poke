const User = require("../models/User");

// login user
const loginUser = async (req, res) => {
  res.json({ msg: "login user" });
};

// signup user
const signupUser = async (req, res) => {
  // grab email and password from request body
  const { email, password } = req.body;

  try {
    // call the custom signup method. if successful, send back 200 and object.
    const user = await User.signup(email, password);
    res.status(200).json({ email, user });

    // if error, send error message
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   res.json({ msg: "signup user" });
};

module.exports = { signupUser, loginUser };
