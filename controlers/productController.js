const { ProductModel } = require("../models/productModel");

// Get all products
const getProducts = async (req, res) => {
    try {
    const { category, rating, title="/", page = 1, limit = 10, sortBy = "asc" } = req.query;
    const query = {};

    if (category) {
      query.category = category;
    }

    if (rating) {
      query.rating = { $gte: parseFloat(rating) };
    }

    if (title) {
      query.title = { $regex: title, $options: "i" }; // Case-insensitive search
    }

    const count = await ProductModel.countDocuments(query);
    const products = await ProductModel.find(query)
      .sort({ price: sortBy === "asc" ? 1 : -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    res.status(200).json({ count, data: products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving products" });
  }
};

// Get a product by ID
const getProductByID = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving product" });
  }
};

// Add a product
const addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding product" });
  }
};

// Add multiple products
const addProducts = async (req, res) => {
  try {
    const products = req.body;
    await ProductModel.insertMany(products);
    res.status(201).json({ message: "Products added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error adding products" });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ message: "Product updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating product" });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndRemove(req.params.id);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting product" });
  }
};

module.exports = {
  getProducts,
  getProductByID,
  addProduct,
  addProducts,
  updateProduct,
  deleteProduct,
};
