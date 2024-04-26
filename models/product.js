const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // avatar: Buffer,
  productName: String,
  productDesc: String,
  productPrice: Number,
  store: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Store'
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
