const jwt = require("jsonwebtoken");
const User = require("../models/User");

const requireAuth = async (req, res, next) => {
  // verify authentication
  const { authorization } = req.headers;

  //   check if it has value
  if (!authorization) {
    return res
      .status(401)
      .json({ error: "Ungas! Authorization token required!" });
  }

  //   if there is value, get the token
  const token = authorization.split(" ")[1];

  try {
    // grab id from the token: verify the token by passing the token and secret
    const { _id } = jwt.verify(token, process.env.SECRET);

    // with that id, find the user in the database. req.user is now the user id.
    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ error: "GAGO! Request not authorized!" });
  }
};

module.exports = requireAuth;
