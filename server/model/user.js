const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        default: null,
    },
    userName: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
    },
    classId: {
        type: mongoose.Schema.Types.ObjectId, // Define as ObjectId
        ref: "Class",
    },
    fName: {
        type: String,
    },
    mName:{
        type: String,
    },
    dob:{
        type: String,
    },
    penNo: {
        type: Number,
    },
    aadharNo:{
        type: Number,
    },
    rollNo:{
        type: Number,
    },
    contactNo:{
        type: Number,
    }
});

module.exports = mongoose.model("User", userSchema);
