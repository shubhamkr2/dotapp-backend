const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  // Split the token string into bearer prefix and token value
  const [bearerPrefix, tokenValue] = token.trim().split(" ");

  // Check if token value and bearer prefix are valid
  if (!tokenValue || bearerPrefix.toLowerCase() !== "bearer") {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    // Verify and decode the token
    const decoded = jwt.verify(tokenValue, process.env.JWT_SECRET);

    // Set the decoded user ID in the request body
    req.body.userId = decoded.id;
    next();
  } catch (error) {
    // Handle invalid token
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { authenticate };
