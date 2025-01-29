const mongoose = require("mongoose");

const friendListSchema = new mongoose.Schema({
    person: {
        type: Number,
    },
    friends: [
        {
            type: Number,
        }
    ]
});

const Friends = mongoose.model("Friends", friendListSchema);
module.exports = Friends;