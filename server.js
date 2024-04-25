const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require("path");
const Store = require('./models/store');

// ---- CONFIGURATIONS ----
const app = express();
app.use(express.static(path.join(__dirname, "public")));
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.get('/store/new', (req, res) => {
  res.render('store/new.ejs');
})

app.post('/store', async (req, res) => {
  await Store.create(req.body);
  res.redirect('/store/new');
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
