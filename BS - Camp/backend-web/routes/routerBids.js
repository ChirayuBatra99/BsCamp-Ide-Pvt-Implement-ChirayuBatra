const db = require("../database/dbsql");
const express = require("express");
const router = new express.Router();
const authenticate = require("../utils/authenticate");
const { generateAuthToken } = require("../utils/authToken");

// http://localhost:8005/bidemojis?time=1920&day=2024-12-08&destination=A
router.get("/bidemojis", async (req, res) => {
    try {
        const { time, day, destination, userId } = req.query;
        // console.log(day, " ", time, " ", destination);
        if (!time || !day || !destination) {
            return res.status(422).json({ error: "Enter all fields." });
        }
        // console.log(userId);
        
        const query1 = "SELECT COUNT(user) FROM bids WHERE day=? AND time=? AND destination=? AND userid!=?";
        db.query(query1, [day, time, destination, userId], async (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.length > 0)
                res.status(201).json(result);
            // console.log(result);
        })
    }
    catch (error) {
        console.log("error occured bro in catch block xbcbcb", error);
        res.status(400).json({ error });
    }
})

router.get("/people", (req, res) => {
    try {
        const { date, time, userId } = req.query;
        if (!date) {
            return res.status(400).json({ error: "Date parameter is required" });
        }
        // const query1 = "SELECT * FROM bids WHERE day=? AND time=? AND userid!=?";
        const query1 = "SELECT bids.*, users.phone FROM bids JOIN users ON bids.userid = users.id WHERE bids.day=? AND bids.time=? AND bids.userid!=?";
        db.query(query1, [date, time, userId], async (err, result) => {
            if (err) return res.status(500).send(err);
            if(result.length > 0)
                res.status(201).json(result);
            // console.log(result);
        })
    }
    catch (error) {
        console.log("error occured bro in catch block people route", error);
        res.status(400).json({ error });
    }
})

module.exports = router;