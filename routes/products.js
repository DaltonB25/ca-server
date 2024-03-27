var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

const Product = require('../models/Product')
// const Task = require("../models/Task");

const isAuthenticated = require('../middleware/isAuthenticated')
const isOwner = require('../middleware/isOwner')

router.post("/products", isAuthenticated, (req, res, next) => {
    const { title, description, price, rating, stock, brand, category, thumbnail, images } = req.body;
  
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
      owner: req.user._id
    })
      .then((createdProduct) => {
        console.log("this is the created project ===>", createdProduct);
        res.json(createdProduct);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  router.get("/", (req, res) => {
    Product.find({})
      .then((products) => {
        console.log("Retrieved cohorts ->", products);
        res.json(products);
      })
      .catch((error) => {
        console.error("Error while retrieving cohorts ->", error);
        res.status(500).json({ errorMsg: "Failed to retrieve cohorts", error });
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