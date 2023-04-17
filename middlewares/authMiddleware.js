const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;
  //   console.log(token)
  if (token) {
    let temp = token.trim().split(" ");
    const decoded = jwt.verify(temp[1], process.env.JWT_SECRET);
    req.body.userId = decoded.id;
    next();
  } else {
    res.status(401).json({ message: "token not found" });
  }
};

module.exports = { authenticate };
