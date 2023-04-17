const { Router } = require("express");
const {
  getCartItems,
  getItemByID,
  addItem,
  updateItem,
  deleteItem,
} = require("../controlers/cartController");

const cartRoute = Router();

cartRoute.get("/", getCartItems);
cartRoute.get("/:id", getItemByID);
cartRoute.post("/", addItem);
cartRoute.put("/:id", updateItem);
cartRoute.delete("/:id", deleteItem);

module.exports = { cartRoute };
