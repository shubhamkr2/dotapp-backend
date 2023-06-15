const { OrderModel } = require("../models/orderModel");

//to get all orders
const getOrders = async (req, res) => {
  const {userId} = req.body;
  try {
    let orders = await OrderModel.find({userId}).sort({ createdAt: -1 });
    res.status(200).json({ data: orders });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order not found" });
  }
};


//to get a order by ID
const getOrderByID = async (req, res) => {
  try {
    let order = await OrderModel.find({ _id: req.params.id });
    res.status(200).json({ data: order });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Order not found" });
  }
};

//to add a order
const addOrder = async (req, res) => {
  try {
    const order = new OrderModel(req.body);
    await order.save();
    res.status(201).json({ message: "Order added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add order" });
  }
};

//to update a order
const updateOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "updated order" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the order" });
  }
};

//to delete a order
const deleteOrder = async (req, res) => {
  try {
    await OrderModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted order" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the order" });
  }
};
module.exports = {
  getOrders,
  getOrderByID,
  addOrder,
  updateOrder,
  deleteOrder,
};
