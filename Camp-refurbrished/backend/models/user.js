const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    phone: {
        type: String,
        required: true,
    },
    userId: {
        type: Number,
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
            type: Number,
            // type: mongoose.Schema.Types.ObjectId,
            // ref: 'User',
        },
    ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;