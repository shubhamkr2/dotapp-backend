const { Router } = require("express");
const {
  getUsers,
  loginUser,
  registerUser,
  getUserByID,
  updateUser,
  deleteUser,
  getUserByEmail,
  checkSecretQuestion,
  resetUserPassword,
} = require("../controlers/userController");
const { authenticate } = require("../middlewares/authMiddleware");

const userRoute = Router();

//to get users
userRoute.get("/", getUsers);
userRoute.get("/:id", getUserByID);

//to login a user
userRoute.post("/login", loginUser);

//to register a user
userRoute.post("/register", registerUser);

//to update and delete a user
userRoute.put("/:id", authenticate, updateUser);
userRoute.delete("/:id", authenticate, deleteUser);

//to check a user by email
userRoute.post("/", getUserByEmail);

//to check matches the security question
userRoute.post("/:id", checkSecretQuestion);

//to update new password
userRoute.put("/reset/:id", authenticate, resetUserPassword);

module.exports = { userRoute };
