const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    section: {
        type: String,
    },
    subjects: {
        type:[String]
    }
});

module.exports = mongoose.model("Class", classSchema);
