const { model, Schema } = require("mongoose");
const productSchema = new Schema(
  {
    title: String,
    description: String,
    price: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: Array,
    owner: {type: Schema.Types.ObjectId, ref: 'User'}
  },
  {
    timestamps: true,
  }
);

// const Student = mongoose.model("Product", productSchema);


module.exports = model("Product", productSchema);
