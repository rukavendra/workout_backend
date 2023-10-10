const jwt = require('jsonwebtoken')
const User = require('../models/useModel')


const authRequired = async (req, res, next)=>{

    // Authenticate the user 
    const {authorization}= req.headers
    if(!authorization){
        res.status(401).json({error: "You must be logged in."})
    }

    const token = authorization.split(" ")[1]

    try{
        const {_id} = jwt.verify(token, process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
    
    } catch(err){err: "Invalid token"}
}

module.exports = authRequired