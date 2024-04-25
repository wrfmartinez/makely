const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    brandName: String,
    bio: String,
    socialLinks: String,
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
