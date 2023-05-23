const { Router } = require("express");
const { authenticate } = require("../middleware/authenticate");
const {
  getCartItems,
  getItemByID,
  addItem,
  updateItem,
  deleteItem,
} = require("../controllers/cartController");

const cartRoute = Router();

// Apply the authenticate middleware to the protected routes
cartRoute.get("/", authenticate, getCartItems);
cartRoute.get("/:id", authenticate, getItemByID);
cartRoute.post("/", authenticate, addItem);
cartRoute.put("/:id", authenticate, updateItem);
cartRoute.delete("/:id", authenticate, deleteItem);

module.exports = { cartRoute };
