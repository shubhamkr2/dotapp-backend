const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//to get all users
const getUsers = async (req, res) => {
  try {
    let query = req.query;
    let users = await UserModel.find(query);
    res.status(200).json({ data: users });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Users not found" });
  }
};
//to get a user by ID
const getUserByID = async (req, res) => {
  try {
    let user = await UserModel.find({ _id: req.params.id });
    res.status(200).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "User not found" });
  }
};
//to register a user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await UserModel.findOne({ email });
  if (userExists) {
    res.status(400).json({ message: "user already exists" });
  }
  try {
    let hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User Registered successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Registration failed" });
  }
};

//to login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User not exists" });
    } else {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        res.status(400).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(200).json({
          name: user.name,
          email: user.email,
          token: token,
        });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Login failed" });
  }
};

//to update a user
const updateUser = async (req, res) => {
  try {
    await UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "updated user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the user" });
  }
};

//to delete a user
const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted user" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the user" });
  }
};

module.exports = {
  getUsers,
  getUserByID,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
};
