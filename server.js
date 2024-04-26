const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');

// SCHEMAS
const Store = require('./models/store');
const Product = require('./models/product');

// ---- CONFIGURATIONS ----
dotenv.config();

// EXPRESS
const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// MONGODB
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// ---- ROUTES ----
// Renders homepage show page
app.get('/', (req, res) => {
  res.render('index.ejs');
});

// Renders the create new store show page
app.get('/store/new', (req, res) => {
  res.render('store/new.ejs');
});

// Renders the add new product show page
app.get('/product/new', (req, res) => {
  res.render('product/new.ejs');
});

// Edits a specific product

// Edits store

// Deletes a specific product
app.delete('/store/:productId', async (req, res) => {

});

// Deletes your store

// Passes reference to all created products and the store to the store show page
app.get('/store', async (req, res) => {
  const userStore = await Store.find();
  const userProducts = await Product.find();
  res.render('store/index.ejs', { store: userStore, products: userProducts });
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

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
