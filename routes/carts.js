var express = require("express");
var router = express.Router();

const Cart = require('../models/Cart')
const Product = require('../models/Product')
const isAuthenticated = require('../middleware/isAuthenticated')

// Create a Cart
router.post("/add", isAuthenticated, (req, res, next) => {
    const { user, products } = req.body
   Cart.create({
        user,
        products
      })
      .then((newCart) => {
        console.log("this is the new cart ===>", newCart);
        res.json(newCart);
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
})

// //Get the cart
router.get("/", (req, res, next) => {
    Cart.find()
    .then((foundCarts) => {
      console.log("Found Carts ===>", foundCarts);
      res.json(foundCarts)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    });
  });

// // Add to cart
router.post("/add/:productId", isAuthenticated, (req, res, next) => {
    Product.findById(req.params.productId)
    .then((addProduct) => {
        console.log("Added product to cart ===>", addProduct)
        res.json(addProduct)
    })
    .catch((error) => {
        console.error("Failed to add product", error);
        res.json({ errorMsg: "Failed to add product", error});
      }); 
})

// // Update cart
router.put("/update/:cartId", isAuthenticated, (req, res, next) => {
    const { cartId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(cartId)) {
      res.status(400).json({ message: "Specified is is not valid" });
      return;
    }
  
    Product.findByIdAndUpdate(cartId, req.body, { new: true })
    .then((updatedCartId) => {
      console.log("Updated product in cart ====>", updatedCartId);
      res.json(updatedCartId);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
  });

//   // Delete product in cart
//   router.delete("/")



module.exports = router

// Add to a cart, Update and delete