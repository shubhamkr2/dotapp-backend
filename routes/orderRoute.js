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

orderRoute.get("/", getOrders);
orderRoute.get("/:id", getOrderByID);
orderRoute.post("/", addOrder);
orderRoute.put("/:id", updateOrder);
orderRoute.delete("/:id", deleteOrder);

module.exports = { orderRoute };
