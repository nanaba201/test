const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    date: {
        type: Number,
    },
    body: {
        type: String,
    },

});

module.exports = mongoose.model("News", newsSchema);
