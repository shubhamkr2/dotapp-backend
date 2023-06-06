const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  orderId: {
    type: String,
    required: true,
  },
  products: [
    {
      category: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      description: {
        type: Array,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      image: {
        type: Array,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      stock: {
        type: Boolean,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      productId: {
        type: String,
        required: true,
      },
      userId: {
        type: String,
        required: true,
      },
    },
  ],
  address:{
    type: string,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const OrderModel = mongoose.model("orders", orderSchema);
module.exports = { OrderModel };
