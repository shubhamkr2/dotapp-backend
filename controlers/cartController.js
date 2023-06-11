const { CartModel } = require("../models/cartModel");

//to get all cart items
const getCartItems = async (req, res) => {
  const {userId} = req.body;
  try {
    let items = await CartModel.find({userId}).maxTimeMS(20000);
    res.status(200).json({ data: items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Items not found" });
  }
};

//to get a item by ID
const getItemByID = async (req, res) => {
  try {
    let item = await CartModel.find({ _id: req.params.id }).maxTimeMS(20000);
    res.status(200).json({ data: item });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Items not found" });
  }
};

const addItem = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    let cartItem = await CartModel.findOne({ userId, productId });

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

      const newItem = new CartModel({
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
    await CartModel.findByIdAndUpdate({ _id: req.params.id }, req.body );
    res.status(200).json({ message: "updated item" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the item" });
  }
};

//to delete a item
const deleteItem = async (req, res) => {
  try {
    await CartModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted item" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete the item" });
  }
};


//to delete many items
const deleteAllItems = async (req, res) => {
  const { Id } = req.body;
  try {
    let result = await CartModel.deleteMany({userId: Id});
    res.status(200).json({ data: result, message: "removed all items });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to delete the items" });
  }
};
module.exports = {
  getCartItems,
  getItemByID,
  addItem,
  updateItem,
  deleteItem,
  deleteAllItems,
};
