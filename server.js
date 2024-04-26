const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
// const multer  = require('multer')
const Store = require('./models/store');
const Product = require('./models/product');

// ---- CONFIGURATIONS ----
const app = express();
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

// // Stores files in memory as Buffer objects to database
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// ---- ROUTES ----
app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/store/new', (req, res) => {
  res.render('store/new.ejs');
});

app.get('/product/new', (req, res) => {
  res.render('product/new.ejs');
});

app.get('/store', async (req, res) => {
  const userStore = await Store.find();
  res.render('store/index.ejs', { store: userStore });
});

app.post('/store', async (req, res) => {
  // const storeCheck = await Store.find();
  try {
    // while (storeCheck.length > 1) {
    //   // delete stores
    // }
    await Store.create(req.body);
  } catch (err) {
    console.log(`Error in saving Store: ${err}`);
  }
  res.redirect('/store');
});

app.post('/store/product', async (req, res) => {
  // const storeCheck = await Store.find();
  try {
    // while (storeCheck.length > 1) {
    //   // delete stores
    // }
    await Product.create(req.body);
  } catch (err) {
    console.log(`Error creating product: ${err}`);
  }
  res.redirect('/store');
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
