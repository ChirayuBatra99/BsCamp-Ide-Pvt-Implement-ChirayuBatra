const express = require("express");
const router = new express.Router();
const User = require("../models/user");

router.post("/veri", async (req, res) => {
    const { token } = req.body;
    console.log("hemlooo");
    
    try {
        const user = await User.findOne({ token: token });
        if (!user) {
            res.status(422).json("no user with this token present");
        }
        else {
            res.status(201).json(user.phone);
        }
    }
    catch (error) {
        res.status(400).json({error: error.message});
    }
});

module.exports = router;