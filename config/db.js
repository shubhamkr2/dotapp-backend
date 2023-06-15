const mongoose = require("mongoose");
require("dotenv").config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to DB");
  } catch (err) {
    console.error("Connection to DB failed:", err);
  }
};

module.exports = { connection };
