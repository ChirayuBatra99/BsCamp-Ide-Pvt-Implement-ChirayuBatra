const mongoose = require("mongoose");

const DB = process.env.MONGOCHAT;

mongoose.connect(DB)
.then(() => 
    console.log("Connected to MONGODB-CHAT server"))
.catch((error) => 
    console.log(error.message)   
);