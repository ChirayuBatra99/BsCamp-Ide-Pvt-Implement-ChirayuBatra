const express = require("express");
const router = new express.Router();

const User = require("../models/user");
const Friends = require("../models/friendList");

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


router.post("/uploadImage", async(req,res) => {
    const {userId, imagesixfour} = req.body;
    try{
        if(!userId || ! imagesixfour)
            res.status(422).json("Details arent coming bro about the image");
        else {
            // uploading logic
            let user = await Friends.findOne({ person: userId });

            if (user) {
                // User exists, update their photo
                user.dpphoto = imagesixfour;
                await user.save();
                return res.status(201).json({ message: "Photo updated successfully", user });
            }
            else {
                // User does not exist, create a new entry
                const newUser = new Friends({
                    person: userId,
                    dpphoto: imagesixfour,
                    friends: []
                });
                await newUser.save();
                return res.status(201).json({ message: "User created and photo uploaded", user: newUser });
            }
        }

    } catch(error) {
        res.status(400).json({error: error.message});
    }

});
module.exports = router;