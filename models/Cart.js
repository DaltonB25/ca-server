const { model, Schema } = require("mongoose");

    

const CartItemSchema = new Schema({
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product'
    },
    quantity: Number,
    title: {
        type: String,
    },
    thumbnail: {
        type: String,
    },
    price: {
        type: Number,
        default: 0
    },
    

});

module.exports = model('CartItem', CartItemSchema)

const CartSchema = new Schema({
    products: [CartItemSchema],
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now
    }
  });
  
  module.exports = model('Cart', CartSchema);


// title: String,
// description: String,
// price: Number,
// rating: Number,
// stock: Number,
// brand: String,
// category: String,
// thumbnail: String,
// images: Array,