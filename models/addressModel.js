const mongoose = require("mongoose");

const addressSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
  },
  flat: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

const AddressModel = mongoose.model("addresses", addressSchema);
module.exports = { AddressModel };
