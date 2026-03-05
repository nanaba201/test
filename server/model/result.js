const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    session: {
        type: String,
    },
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    term1: {
        type:[{}],
        default: []
    },
    term2: {
        type:[{}],
        default: []
    }
});

module.exports = mongoose.model("Result", resultSchema);
