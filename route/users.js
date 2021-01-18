const express = require('express');
const route = express.Router();
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const {User , validateUser } = require('../models/user');

const authmiddleware = require('../middleware/auth');
const asyncmiddleware = require('../middleware/asyncmiddleware');

route.get('/me',authmiddleware, asyncmiddleware( async (req,res)=>{
    const user = await User.findById(req.user._id).select('name email -_id');
    res.send(user);
}));

route.post('/', asyncmiddleware( async (req,res)=>{
    console.log("post"+JSON.stringify(req.body));
    const {error} = validateUser(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email:req.body.email});
    if(user) return res.status(400).send('user already exists')
    


    user = new User(_.pick(req.body,["name","email","password"]));

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password , salt);

    await user.save();
    res.send(_.pick(user,["name","email"]));
}));


module.exports = route;