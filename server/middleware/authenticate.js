const jwt = require('jsonwebtoken');
const User = require('../models/schema');


const authenticate = async(req, res, next) =>{
    try{
        const token = req.cookies.jwtoken;
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDhmZWI1ZmFkOWU2YTIxOTBmZTk4NmIiLCJpYXQiOjE2MjAwNDQ2NTd9.d7TJxpzmdg61LNGChytvcwckGr_cGc4tyfOr8p5rcqk";
        // console.log(req.cookies.jwtoken);
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);

        const rootUser = await User.findOne({_id:verifyToken._id, "tokens.token":token});
        if(!rootUser){throw new Error(`User not Found`)};
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        
        next();
    }catch(err){
        res.status(401).send("Unauthorized: No token provied")
        console.log(err);
    }
}

module.exports = authenticate;