const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{  // Fix typo here
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    weight:{
        type: Number,
        required: true,
    },
    height:{
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model("User", UserSchema);
