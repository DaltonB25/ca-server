var express = require("express");
var router = express.Router();

const Cart = require('../models/Cart')
const Product = require('../models/Product')
const isAuthenticated = require('../middleware/isAuthenticated')

// Create a user's Cart, but should only be hit if user doesn't have a cart (right after signup)
router.post("/add", isAuthenticated, (req, res, next) => {

  Cart.create({
    user: req.user._id,
    products: []
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

//Gets a user's cart
router.get("/", isAuthenticated, async (req, res, next) => {

  try {

    let thisCart = await Cart.findOne({ user: req.user._id })

    let populatedCart = await thisCart.populate({path: 'products.product'})


    // if (thisCart.products && thisCart.products.length) {

    //   let productPromises = thisCart.products.map((product) => {
    //     return Product.findById(product.product)
    //   })

    //   let foundProducts = await Promise.allSettled(productPromises)

    //   let completedProducts = []

    //   foundProducts.forEach((product, index) => {
    //     completedProducts.push({ product: product, quantity: thisCart.products[index].quantity, price: thisCart.products[index] })
    //   })

    //   thisCart.products = completedProducts


    // }


    res.json(populatedCart)

  } catch (err) {
    console.log(err);
    res.json(err)
  }

});

// // Adds a product to cart
router.post("/add/:productId/:cartId", isAuthenticated, async (req, res, next) => {

  try {

    const { productId, cartId } = req.params

    const { quantity } = req.body

    let thisProduct = await Product.findById(productId)

    let thisProductTotal = thisProduct.price * quantity

    let productToAdd = {
      product: productId,
      quantity,
      price: Number(thisProductTotal)
    }

    let thisCart = await Cart.findById(cartId)

    thisCart.products.push(productToAdd)



    let updatedCart = await thisCart.save()
    let populated = await updatedCart.populate("products.product")
    res.json(populated)

  } catch (err) {
    console.log("Error adding to cart", err)
    res.json({ errorMessage: "Error adding item to cart", err })
  }

})

// Update product quantity in cart
router.put("/update-quantity/:productId", isAuthenticated, async (req, res, next) => {

  try {
    const { productId } = req.params;

    const { quantity } = req.body

    let thisCart = await Cart.findOne({ user: req.user._id })
    let productIndex

    let thisProduct = thisCart.products.find((product, index) => {
      productIndex = index
      return product.product == productId
    })

    thisProduct.quantity  = quantity

    let foundProduct = await Product.findById(productId)

    console.log("thisproduct", thisProduct)
    console.log("thisfoundprodcut", foundProduct)


    thisProduct.price = Number(quantity * foundProduct.price)

    thisCart.products[productIndex] = thisProduct

    let updatedCart = await thisCart.save()
    let populated = await updatedCart.populate("products.product")

    res.json(populated)

  } catch (err) {
    console.log(err);
    res.json(err);
  }


});

// Delete all instances of a product in cart
router.delete("/:productId", isAuthenticated, async (req, res, next) => {
  try {

    let thisCart = await Cart.findOne({ user: req.user._id })

    let fewerProducts = thisCart.products.filter((product) => product.product != req.params.productId)

    thisCart.products = fewerProducts

    let refreshedCart = await thisCart.save()
    let populated = await refreshedCart.populate("products.product")

    res.json(populated)

  } catch (err) {
    console.log(err);
    res.json(err)
  }
})

// Delete an entire cart after your finalize purchase 
router.delete('/:cartId', isAuthenticated, (req, res, next) => {
  Cart.findByIdAndDelete(req.params.cartId)
    .then((deletedCart) => {
      console.log("this is the deleted cart ===>", deletedCart)
      res.json(deletedCart)
    })
    .catch((err) => {
      console.log(err);
      res.json(err)
    })
})



module.exports = router

