const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  products: {
    type: Array,
    required:true,
  },
  address:{
    type: Object,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = { OrderModel };
