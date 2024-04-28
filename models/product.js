const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  // avatar: Buffer,
  productName: String,
  productDesc: String,
  productPrice: Number,
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
