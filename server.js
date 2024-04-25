const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ---- CONFIGURATIONS ----
const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.listen('3001', () => {
  console.log('Listening on port 3001');
});
