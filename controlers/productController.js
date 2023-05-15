const { ProductModel } = require("../models/productModel");

//to get all products
const getProducts = async (req, res) => {
  try {
    //checking these query is requested or not
    let isCategory = req.query?.category !== undefined;
    let isPage = req.query?.page !== undefined;
    let isLimit = req.query?.limit !== undefined;
    let isSort = req.query?.sortBy !== undefined;

    //Storing requested query
    let category = req.query.category;
    let page = +req.query?.page;
    let limit = +req.query?.limit;
    let sort = req.query?.sortBy;
    let sortAs;
    if (isSort) {
      if (sort === "asc") {
        sortAs = 1;
      } else if (sort === "desc") {
        sortAs = -1;
      }
    }
    let AllProducts = await ProductModel.find(req.query);
    let length = AllProducts.length+1;
    // console.log(isPage, isLimit, isSort);

    //if category,page,limit and sort are passed in query
    if (isCategory && isPage && isLimit && isSort) {
      let product = await ProductModel.find({ category: category })
        .limit(limit)
        .sort({ price: sortAs })
        .skip(limit * (page - 1));
      res.status(200).json({ length: length, data: product });

      //if only page,limit and sort are passed in query
    } else if (isPage && isLimit && isSort) {
      let product = await ProductModel.find()
        .limit(limit)
        .sort({ price: sortAs })
        .skip(limit * (page - 1));
      res.status(200).json({ length: length, data: product });

      //if only category,page and limit are passed in query
    } else if (category && isPage && isLimit) {
      let product = await ProductModel.find({ category: category })
        .limit(limit)
        .skip(limit * (page - 1));
      res.status(200).json({ length: length, data: product });

      //if only page and limit are passed in query
    } else if (isPage && isLimit) {
      let product = await ProductModel.find()
        .limit(limit)
        .skip(limit * (page - 1));
      res.status(200).json({ length: length, data: product });

      //if only category and sort are passed in query
    } else if (category && isSort) {
      let product = await ProductModel.find({ category: category }).sort({
        price: sortAs,
      });
      res.status(200).json({ length: length, data: product });

      //if only sort is passed in query
    } else if (isSort) {
      let product = await ProductModel.find().sort({ price: sortAs });
      res.status(200).json({ length: length, data: product });

      //if any conditions are passed in query
    } else {
      let product = await ProductModel.find(req.query);
      res.status(200).json({ length: length, data: product });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product not found" });
  }
};

//to get a product by ID
const getProductByID = async (req, res) => {
  try {
    let product = await ProductModel.find({ _id: req.params.id });
    res.status(200).json({ data: product });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Product not found" });
  }
};

//to add a product
const addProduct = async (req, res) => {
  try {
    const product = new ProductModel(req.body);
    await product.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add product" });
  }
};

//to add multiple products
const addProducts = async (req, res) => {
  console.log(req.body);
  try {
    const products = req.body;
    for (let i = 0; i < products.length; i++) {
      const product = new ProductModel(products[i]);
      await product.save();
    }
    res.status(201).json({ message: "Products added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to add products" });
  }
};

//to update a product
const updateProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).json({ message: "updated product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the product" });
  }
};

//to delete a product
const deleteProduct = async (req, res) => {
  try {
    await ProductModel.findByIdAndRemove({ _id: req.params.id });
    res.status(200).json({ message: "deleted product" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Unable to update the product" });
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
