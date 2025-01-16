const db = require("../database/dbsql");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = new express.Router();
const authenticate = require("../utils/authenticate");
const { generateAuthToken } = require("../utils/authToken");
const crypto = require("crypto");

const User = require("../models/user");

router.post("/register", async (req, res) => {
    try {
        console.log(req.body);
        const { phone, password, cpassword } = req.body;
        if (!phone || !password || !cpassword) {
            return res.status(422).json({ error: "Enter all fields" });
        }
        if (password !== cpassword) {
            return res.status(422).json({ error: "Passwords don't match" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const hpassword = hashedPassword
        // Check if user already exists
        db.query("SELECT * FROM users WHERE phone = ?", [phone], async (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length > 0) {
                return res.status(422).json({ error: "User already exists" });
            }

            // Hash the password
            // const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            
            const sqlInsert = "INSERT INTO users (phone, password, cpassword) VALUES (?, ?, ?)";
            db.query(sqlInsert, [phone, hashedPassword, hpassword], (err, result) => {
                console.log("ee",err);
                
                if (err) 
                    console.log("Bro here is an error, but im not stopping mongodb registration");
                // return res.status(500).send(err);
            });
        });
        // console.log(hashedPassword);
        
        //MongoDB one..
        const newUser = new User({phone,password: hashedPassword, cpassword: hashedPassword});
        await newUser
        .save()
        .then(() => {
            console.log("rgisterd in mongo as well");
            res.status(200).json({message: "successful registration in SQL and Mongo"});
        })
        .catch(error => {
            console.log("Bro we got error in registering", error);
            res.status(500).json({message: error});
        });


    } catch (error) {
        console.log("Error in /register route:", error);
        res.status(500).send(error);
    }
});


router.post("/login", async (req, res) => {
    const { phone, password } = req.body;
    if (!phone || !password) {
        return res.status(422).json({ error: "Enter all fields" });
    }
    try {
        db.query("SELECT * FROM users WHERE phone = ?", [phone], async (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length === 0) {
                return res.status(400).json({ error: "User not present in DB" });
            }

            const user = result[0];
            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({ error: "Invalid password" });
            }
        
            // const token = generateAuthToken(user.id);
            // I was using the above line to generate token previously.
            const secretKey = crypto.randomBytes(32).toString('hex');
            const token = jwt.sign({userId: user.id}, secretKey);

            console.log("Token sent bro");
            res.status(201).json({token});

            // res.cookie("Bscamp", token, {
            //     expires: new Date(Date.now() + 36000000),
            //     httpOnly: true,
            // });

            // next 4 lines is adding token to the database next to the email, it will store only 1 token latest
            // db.query("UPDATE users SET token= ? WHERE phone= ?", [token, phone], async (err1, result1) => {
            //     if (err1) console.log(err1);
            //     if (result1) console.log("added token to db as well")
            // })
            // console.log("cookie sent");
        });
    } catch (error) {
        console.log("Error in /login route:", error.message);
        res.status(500).send(error);
    }
});

router.post("/placebid", async(req,res) => {
    // const {email, selectedDate, timeRange, destination, userId} = req.body;
    // console.log(email, selectedDate, timeRange, destination);
    const {selectedDate, timeRange, destination, userId} = req.body;
    console.log(selectedDate, timeRange, destination, userId);

    if(!selectedDate || !timeRange || !destination)
        return res.status(422).json({ error: "Enter all fields" });
    try{
        db.query("SELECT * FROM bids WHERE userid=? AND day=? AND time=? AND destination=?",[userId, selectedDate, timeRange, destination], (err, result) => {
            if (err) return res.status(500).send(err);

            if (result.length > 0) {
                return res.status(422).json({ error: "You have already placed a bid in here" });
            }
            const sqlInsert = "INSERT INTO bids (user, day, time, destination, userid) VALUES (?, ?, ?, ?, ?)";
            db.query(sqlInsert, ["Will remove", selectedDate, timeRange, destination, userId], (err, result) => {
                if (err) return res.status(500).send(err);

                res.status(201).json({ message: "Bid placed successfully" });
            })
        })
    }
    catch(error){
        console.log("Error in place bid route:", error);
        res.status(500).send(error);
    }
})

router.post("/myprofile", async (req, res) => {
    console.log("Hemlo");
    
    const {userId} = req.body;
    if(!userId)
    {
        console.log("Bro, there is no userId coming");
        return res.status(400).json({ error: "userId is required" }); // Fixed
    }
    try{
        const query1 = "SELECT phone FROM users WHERE id=?";
        db.query(query1, [userId], async(err, result) => {
            if(err) 
                return res.status(500).json({error: "Failed to get mob number"});
            if (result.length == 0)
                return res.status(422).json({ error: "user not found with this userId" })
            console.log(result);
            res.status(201).json({result});
        })
    }
    catch(error) {
        console.log("Error in catch block", error.message);
        return res.status(500).json({error: error.message});
    }
        
})

router.post("/changepassword", authenticate, async (req, res) => {
    const { opassword, npassword, cnpassword } = req.body;
    if (!opassword || !npassword || !cnpassword)
        return res.status(400).json({ error: "Enter all fields bro" })
    if (npassword !== cnpassword)
        return res.status(400).json({ error: "new passwords dont match" })
    try {
        const sqlquery1 = "SELECT password FROM users WHERE email = ?";
        db.query(sqlquery1, [req.rootUser.email], async (err, result) => {
            if (err)
                return res.status(500).send(err)
            if (result.length == 0)
                return res.status(422).json({ error: "user not found with this email" })

            const storedHash = result[0].password;
            const isMatch = await bcrypt.compare(opassword, storedHash);
            if (!isMatch)
                return res.status(400).json({ error: "Old password doesn't match" });

            const sqlquery2 = "UPDATE users SET password = ? WHERE email= ?";
            const npasswordHash = await bcrypt.hash(npassword, 10);
            db.query(sqlquery2, [npasswordHash, req.rootUser.email], async (err, result) => {
                if (err)
                    return req.status(400).send(err)
                res.status(200).json({ message: "Password updated bro" })
            })
        })
    }
    catch (error) {
        res.status(400).json({ error: error.message })
        console.log("here in catch block", error);
    }
})

router.post("/logout", authenticate, async(req, res) => {
    const email = req.rootUser.email;

    try{
        res.clearCookie("Bscamp", {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
        })
        db.query("UPDATE users set token = NULL WHERE email = ?" , [email], (err, result) => {
            if(err)
            {
                console.log("Error updating token in DB:", err);
                return res.status(500).json({ error: "Error logging out. Please try again." });
            }
            res.status(200).json({message: "User logged out success"});
            console.log("user logged out bro");
        })
    }
    catch(error){
        console.log("error a gyi bro, in logging out");
        res.status(400).json({error: error.message});
    }
})


module.exports = router;