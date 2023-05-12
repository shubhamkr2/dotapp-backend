const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
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
  images: {
    type: Array,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  highlights: {
    type: String,
    required: true,
  },
  stock: {
    type: Boolean,
    required: true,
  },
});

const ProductModel = mongoose.model("product", productSchema);
module.exports = { ProductModel };
