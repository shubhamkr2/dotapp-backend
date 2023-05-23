const { Router } = require("express");
const {
  getCartItems,
  getItemByID,
  addItem,
  updateItem,
  deleteItem,
} = require("../controlers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

const cartRoute = Router();

cartRoute.get("/", authenticate, getCartItems);
cartRoute.get("/:id", authenticate, getItemByID);
cartRoute.post("/", authenticate, addItem);
cartRoute.put("/:id", authenticate, updateItem);
cartRoute.delete("/:id", authenticate, deleteItem);

module.exports = { cartRoute };
