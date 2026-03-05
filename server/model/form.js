const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    type: {
        type: String,
    },
    data: {
        type: {},
        default: {}
    }
});

module.exports = mongoose.model("Form", formSchema);
