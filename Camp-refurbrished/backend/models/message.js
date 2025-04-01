const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({ 
    senderId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        required: true,
    },
    receiverId: {
        // type: mongoose.Schema.Types.ObjectId,
        type: Number,
        required: true,
    },
    conversationId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    timeStamp: {
        type: Date,
        default: Date.now,
    }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;