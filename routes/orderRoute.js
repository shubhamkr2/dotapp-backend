const { Router } = require("express");
const {
  getOrders,
  getOrderByID,
  addOrder,
  updateOrder,
  deleteOrder,
} = require("../controlers/orderController");
const { authenticate } = require("../middlewares/authMiddleware");

const orderRoute = Router();

orderRoute.get("/", authenticate, getOrders);
orderRoute.get("/:id", authenticate, getOrderByID);
orderRoute.post("/", authenticate, addOrder);
orderRoute.put("/:id", authenticate, updateOrder);
orderRoute.delete("/:id", authenticate, deleteOrder);

module.exports = { orderRoute };
