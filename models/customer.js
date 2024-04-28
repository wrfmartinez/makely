const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  customerName: String,
  customerEmail: String,
  customerPhoneNumber: Number,
});

const Customer = mongoose.model("Customer", customerSchema);

module.exports = Customer;
