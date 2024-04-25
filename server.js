const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Store = require('models/store');

// ---- CONFIGURATIONS ----
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
})

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
