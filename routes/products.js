var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Product = require("../models/Product");
const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

// Create new product
router.post("/", isAuthenticated, (req, res, next) => {
  const {title, description, price, rating, stock, brand, category, thumbnail, images,} = req.body;

  Product.create({
    title,
    description,
    price,
    rating,
    stock,
    brand,
    category,
    thumbnail,
    images,
    owner: req.user._id,
  })
    .then((createdProduct) => {
      console.log("this is the created product ===>", createdProduct);
      res.json(createdProduct);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
});

// Get all products
router.get("/", (req, res, next) => {
  Product.find()
  .then((foundProducts) => {
    console.log("Found Product ===>", foundProducts);
    res.json(foundProducts)
  })
  .catch((err) => {
    console.log(err);
    res.json(err)
  });
});

// Get product by ID
router.get("/:productId", (req, res, next) => {
  Product.findById(req.params.productId)
  .then((foundProducts) => {
    console.log("Found product ->", foundProducts);
    res.json(foundProducts)
  })
  .catch((error) => {
    console.error("Failed to retrieve product", error);
    res.json({ errorMsg: "Failed to retrieve product", error});
  });
});

// Update product ID
router.put("/update/:productId", isAuthenticated, (req, res, next) => {
  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified is is not valid" });
    return;
  }

  Product.findByIdAndUpdate(productId, req.body, { new: true })
  .then((updatedProduct) => {
    console.log("Updated product ====>", updatedProduct);
    res.json(updatedProduct);
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });
});

// Delete product by ID
router.delete("/delete/:productId", isAuthenticated, (req, res, next) => {

  const { productId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(productId)) {
    res.status(400).json({ message: "Specified is is not valid" });
    return;
  }

  Product.findByIdAndDelete(productId)
  .then((deletedProduct) => {
    console.log("This is our deleted product", deletedProduct)
    res.json(deletedProduct)
  })
  .catch((err) => {
    console.log(err);
    res.json(err);
  });

})

module.exports = router;

//   title: String,
//   description: String,
//   price: Number,
//   rating: Number,
//   stock: Number,
//   brand: String,
//   category: String,
//   thumbnail: String,
//   images: Array,
