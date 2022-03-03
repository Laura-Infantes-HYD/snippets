const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authenticate = async (req, res, next) => {
  const token = req.headers["authorization"].replace("Bearer ", "");
  const verification = jwt.verify(
    JSON.parse(token),
    process.env.ACCESS_TOKEN_SECRET
  );

  if (!verification.id)
    return res.status(401).json({ message: "Authentication error" });

  let user;

  try {
    user = await User.findById(verification.id).select("-password");
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  delete user.password;

  res.user = user;
  next();
};

module.exports = authenticate;
