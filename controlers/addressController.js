const { AddressModel } = require("../models/addressModel");

//to get all address
const getAddress = async (req, res) => {
  const {userId} = req.body;
  try {
    let address = await AddressModel.find({userId});
    res.status(200).json({ data: address });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Address not found" });
  }
};

//to get a address by ID
const getAddressByID = async (req, res) => {
  try {
    let address = await AddressModel.find({ _id: req.params.id });
    res.status(200).json({ data: address });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Address not found" });
  }
};

const addAddress = async (req, res) => {

  try {
      const { name, number, flat, area, landmark, pincode, city, state, userId } = req.body;

      const newAddress = new AddressModel({
        userId,
        name,
        number,
        flat,
        area,
        landmark,
        pincode,
        city,
        state,
      });

      await newAddress.save();
      return res.status(201).json({ message: "Address added successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add address" });
  }
};




//to update a address
const updateAddress = async (req, res) => {
  try {
    await AddressModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
    res.status(200).json({ message: "updated address" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the address" });
  }
};

//to delete a address
const deleteAddress = async (req, res) => {
  try {
    await AddressModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted address" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the address" });
  }
};
module.exports = {
  getAddress,
  getAddressByID,
  addAddress,
  updateAddress,
  deleteAddress,
};
