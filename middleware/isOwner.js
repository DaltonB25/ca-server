const Product = require('../models/Product')

const isOwner = (req, res, next) => {

    const { productId } = req.params;

    Product.findById(productId)
        .then((foundProduct) => {
            if (foundProduct.owner.toString() === req.user._id) {
                next()
            } else {
                res.status(402).json({message: "Not authorized"})
            }
        })
        .catch((err) => {
            console.log(err)
            res.json(err)
        })

}

module.exports = isOwner