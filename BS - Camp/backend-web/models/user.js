const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    cpassword: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        
    },
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
    ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;