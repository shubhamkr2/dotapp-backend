const { Router } = require("express");
const {
  getProducts,
  getProductByID,
  addProduct,
  updateProduct,
  deleteProduct,
  addProducts,
} = require("../controlers/productController");

const productRoute = Router();

productRoute.get("/", getProducts);
productRoute.get("/:id", getProductByID);
productRoute.post("/", addProduct);
productRoute.post("/multi", addProducts);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

module.exports = { productRoute };
