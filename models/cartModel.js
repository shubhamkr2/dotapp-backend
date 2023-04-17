const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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
  userId: {
    type: String,
    required: true,
  },
});

const CartModel = mongoose.model("carts", cartSchema);
module.exports = { CartModel };
