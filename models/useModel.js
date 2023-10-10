const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator= require('validator')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
})

// static signUp method 
UserSchema.statics.signup = async function(email,password){

    //validation 
    if(!email || !password){
        throw Error('All Fields Required')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not Valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not Strong Enough')
    }
    
    const exist = await this.findOne({email})
    if(exist){
        throw Error('Email Already in Use')
    }
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password,salt)

    const user = await this.create({email, password:hash})

    return user
}

// static login method
UserSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All Fields Required')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Invalid Email')
    }

    const match = await bcrypt.compare(password,user.password)
    if(!match){
        throw Error('Invalid Password')
    }

    return user
}

module.exports = mongoose.model('Users',UserSchema)