const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const config = require('config');

const Userschema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        required:true,
        maxlength:100
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:100
    },
    password:{
        required:true,
        maxlength:1024,
        minlength:5,
        type:String
    }
});

Userschema.methods.getUserAuth = function () {
    let token = jwt.sign({_id:this._id} ,config.get('jwtKey'));
    return token;

}

const User = mongoose.model('user',Userschema);

function validateUser(user) {
    const schema =  Joi.object({
        name:Joi.string().min(3).max(100).required(),
        email:Joi.string().min(5).max(100).email().required(),
        password:Joi.string().min(5).max(128).required()
    });
    return schema.validate(user);
}

module.exports.Userschema = Userschema;
module.exports.User = User ;
module.exports.validateUser= validateUser;