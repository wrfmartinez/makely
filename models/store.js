const mongoose = require('mongoose');

const storeSchema = new mongoose.Schema({
    brandName: String,
    bio: String,
    instagramLink: String,
    youtubeLink: String,
    xLink: String,
});

const Store = mongoose.model("Store", storeSchema);

module.exports = Store;
