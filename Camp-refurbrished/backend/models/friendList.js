const mongoose = require("mongoose");

const friendListSchema = new mongoose.Schema({
    person: {
        type: Number,
    },
    dpphoto: {
        type: String,
    },
    friends: [
        {
            type: Number,
        }
    ]
});

const Friends = mongoose.model("Friends", friendListSchema);
module.exports = Friends;