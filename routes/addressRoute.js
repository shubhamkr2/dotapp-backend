const { Router } = require("express");
const {
  getAddress,
  getAddressByID,
  addAddress,
  updateAddress,
  deleteAddress,
} = require("../controlers/addressController");
const { authenticate } = require("../middlewares/authMiddleware");

const addressRoute = Router();

addressRoute.get("/", authenticate, getAddress);
addressRoute.get("/:id", authenticate, getAddressByID);
addressRoute.post("/", authenticate, addAddress);
addressRoute.put("/:id", authenticate, updateAddress);
addressRoute.delete("/:id", authenticate, deleteAddress);

module.exports = { addressRoute };
