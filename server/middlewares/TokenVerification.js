
const {customError} = require("../utils/CustomError.js")
const jwt = require('jsonwebtoken')
const UserModel = require("../models/User.js")
const TokenVerification = async(req,res,next)=>{
    const token =req.cookies.token
    console.log(token);
    if(!token) return next(customError(404,"you are not authenticated!"))

    try {
        const usertoken = jwt.verify(token, process.env.JWT_SECRET);
        const user = await UserModel.findById(usertoken.id);
    
        // Attach user information to the request object for use in subsequent middleware or routes
        req.user = user;
        next();
    } catch (error) {
        next(customError(500,"Something is Wrong"))
    }
   
}

module.exports= TokenVerification