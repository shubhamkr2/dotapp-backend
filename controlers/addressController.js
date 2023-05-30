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

const addItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem = await AddressModel.findOne({ userId, productId });

    if (cartItem) {
      const updatedQuantity = +cartItem.quantity + (+quantity);

      if (updatedQuantity <= 5) {
        cartItem.quantity = updatedQuantity;
        await cartItem.save();
        return res.status(200).json({ message: "Updated item quantity" });
      } else {
        return res.status(400).json({ message: "Quantity limit exceeded" });
      }
    } else {
      const { category, title, description, price, image, rating, stock } = req.body;

      const newItem = new AddressModel({
        userId,
        productId,
        category,
        title,
        description,
        price,
        image,
        rating,
        stock,
        quantity,
      });

      await newItem.save();
      return res.status(201).json({ message: "Item added successfully" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add item" });
  }
};




//to update a item
const updateItem = async (req, res) => {
  try {
    await AddressModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
    res.status(200).json({ message: "updated item" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the item" });
  }
};

//to delete a item
const deleteItem = async (req, res) => {
  try {
    await AddressModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted item" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the item" });
  }
};
module.exports = {
  getAddress,
  getAddressByID,
  addAddress,
  updateAddress,
  deleteAddress,
};
