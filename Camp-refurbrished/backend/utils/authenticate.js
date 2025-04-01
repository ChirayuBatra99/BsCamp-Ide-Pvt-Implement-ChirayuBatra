const jwt = require("jsonwebtoken");
const keysecret = process.env.JWT_SECRET;
const db = require("../database/dbsql");

const authenticate = async(req, res, next) => {
    try{
        const token = req.cookies.Bscamp;
        const verifyToken = jwt.verify(token, keysecret);
        db.query("SELECT * FROM users WHERE token = ?", [token], async(err, result) => {
            if(err)
                return res.status(500).send(err)
            if(!result)
                return res.status(400).json({error: "User failed at authenticate script"})
            
            req.token = token;
            req.rootUser = result[0];
            console.log("user authenticated");
            next();
        })
    }
    catch(error){
        res.status(401).json({ error: "Authentication error", details: error.message });
        console.log(error.message);
        
    }
}


module.exports = authenticate;