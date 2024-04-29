const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

// SCHEMAS
const Store = require('./models/store');
const Product = require('./models/product');
const Customer = require('./models/customer');

// ---- CONFIGURATIONS ----
dotenv.config();

// EXPRESS
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// MONGODB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// ---- ROUTES ----
// Renders homepage show page
app.get('/', async (req, res) => {
  const userStore = await Store.find();
  res.render('index.ejs', { store: userStore });
});

// Passes reference to all created products and the store to the store show page
app.get('/store', async (req, res) => {
  const userStore = await Store.find();
  const userProducts = await Product.find();
  res.render('store/index.ejs', { store: userStore, products: userProducts });
});

// Renders the customer show page
app.get('/customers', async (req, res) => {
  const allCustomers = await Customer.find();
  res.render('customer/index.ejs', { customers: allCustomers });
});

// Renders the create a customer page
app.get('/customer/new', async (req, res) => {
  res.render('customer/new.ejs')
})

// Finds a specific customer by id and shows their page
app.get('/customer/:customerId', async (req, res) => {
  const foundCustomer = await Customer.findById(req.params.customerId);
  res.render('customer/show.ejs', { customer: foundCustomer })
})

// Renders the create new store show page
app.get('/store/new', async (req, res) => {
  const userStore = await Store.find();
  res.render('store/new.ejs', { store: userStore });
});

// Renders the add new product show page
app.get('/product/new', (req, res) => {
  res.render('product/new.ejs');
});

// Renders the edit page for a product
app.get('/product/:productId/edit', async (req, res) => {
  const foundProduct = await Product.findById(req.params.productId);
  res.render('product/edit.ejs', { product: foundProduct });
});

// Renders the edit page for users store
app.get('/store/:storeId/edit', async (req, res) => {
  const foundStore = await Store.findById(req.params.storeId);
  res.render('store/edit.ejs', { store: foundStore });
});

// Creates a new customer
app.post('/customers', async (req, res) => {
  try {
    await Customer.create(req.body);
    res.redirect('/customers');
  } catch (err) {
    console.log(`Error creating store: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

// Creates a new store if one hasn't been created yet
app.post('/store', async (req, res) => {
  try {
    storeAmount = await Store.find();
    if (storeAmount.length < 1) {
      await Store.create(req.body);
      res.redirect('/store');
    }
  } catch (err) {
    console.log(`Error creating store: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

// Creates a new product
app.post('/product', async (req, res) => {
  try {
    // Create a new product using the Product model
    await Product.create(req.body);
    // Redirect to the store page after adding the product
    res.redirect('/store');
  } catch (err) {
    console.error(`Error creating product: ${err}`);
    res.status(500).send('Internal Server Error');
  }
});

// Deletes a specific product
app.delete('/product/:productId', async (req, res) => {
  const productToDelete = await Product.findByIdAndDelete(req.params.productId);
  res.redirect('/store');
});

// Deletes your store
app.delete('/store/:storeId', async (req, res) => {
  const storeToDelete = await Store.findByIdAndDelete(req.params.storeId);
  res.redirect('/');
});

// Edits a specific product
app.put('/product/:productId', async (req, res) => {
  await Product.findByIdAndUpdate(req.params.productId, req.body);
  res.redirect('/store');
});

// Edits store
app.put('/store/:storeId', async (req, res) => {
  await Store.findByIdAndUpdate(req.params.storeId, req.body);
  res.redirect('/store');
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
