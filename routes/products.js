var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Product = require("../models/Product");
const isAuthenticated = require("../middleware/isAuthenticated");
const isOwner = require("../middleware/isOwner");

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
