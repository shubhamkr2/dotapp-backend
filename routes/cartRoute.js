const { Router } = require("express");
const {
  getCartItems,
  getItemByID,
  addItem,
  updateItem,
  deleteItem,
  deleteAllItems,
} = require("../controlers/cartController");
const { authenticate } = require("../middlewares/authMiddleware");

const cartRoute = Router();

cartRoute.get("/", authenticate, getCartItems);
cartRoute.get("/:id", authenticate, getItemByID);
cartRoute.post("/", authenticate, addItem);
cartRoute.put("/:id", authenticate, updateItem);
cartRoute.delete("/:id", authenticate, deleteItem);
cartRoute.delete("/", authenticate, deleteAllItems);

module.exports = { cartRoute };
