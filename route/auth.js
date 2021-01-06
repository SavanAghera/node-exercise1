const express = require('express');
const route = express.Router();
const bcrypt = require('bcryptjs');
const {User} = require('../models/user');
const Joi = require('joi');
const asyncmiddleware = require('../middleware/asyncmiddleware');

route.post('/',asyncmiddleware( async (req,res)=>{
    const  {error} = validateAuth(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send("user not found");

    const result = await bcrypt.compare(req.body.password,user.password);
    if(!result) return res.status(400).send('passward incurrect');

    let token = user.getUserAuth();
    res.header('x-auth', token).send('login success');
}));

function validateAuth(auth) {
    const schema = Joi.object({
        email:Joi.string().min(5).max(100).required().email(),
        password:Joi.string().min(5).max(128).required()
    });
    return schema.validate(auth);
    
}

module.exports = route;
