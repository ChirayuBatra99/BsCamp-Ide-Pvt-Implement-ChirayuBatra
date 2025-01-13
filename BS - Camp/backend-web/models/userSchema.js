// THIS IS OLD ONE, BEFORE EVEN IMPLEMENTING SQL DB.



// const mongoose = require("mongoose");
// const validator = require("validator")
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const secretkey = process.env.KEY;

// const userSchema = new mongoose.Schema({
//     email:{
//         type: String,
//         required: true,
//         unique: true,
//         // validate(value){
//         //     if(!validator.isEmail(value))
//         //         throw new Error("Not a valid Email address");     
//         // }
//     },
//     password:{
//         type: String,
//         required: true,
//         minlength: 6,
//     },
//     cpassword:{
//         type: String,
//         required: true,
//         minlength: 6,
//     }, 
//     tokens: [
//         {
//             token: {
//                 type: String,
//                 required: true,
//             }
//         }
//     ],
//     // carts : Array
//     // ******** To fix this carts
// })

// userSchema.pre("save", async function(next) {
//     if(this.isModified("password"))
//     {
//         this.password = await bcrypt.hash(this.password, 12);
//         this.cpassword = await bcrypt.hash(this.cpassword, 12);
//     }
//     next();
// })

// userSchema.methods.generateAuthToken = async function() {
//     try{
//         let token_one = jwt.sign({_id: this.id}, secretkey, {
//             // expiry to set
//         });
//         this.tokens = this.tokens.concat({token: token_one});
//         await this.save();
//         return token_one;
//     }
//     catch(error){
//         console.log("userschema page catch block token creation");
//     }
// }

// const User = mongoose.model("User", userSchema);
// module.exports = User;

