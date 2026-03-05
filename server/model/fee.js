const mongoose = require('mongoose');

const feeSchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId, // Define as ObjectId
        ref: "User",
    },
    session: {
        type: String,
    },
    feesList: {
        type:[{}],
        default: []
    },
    rebate: {
        type: Number,
        default: 0
    },
    receipts: {
        type:[{}],
        default: []
    },
});

module.exports = mongoose.model("Fee", feeSchema);
