const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET;
const requireLogin = require('../middelware/requireLogin');




router.post('/signup',(req,res)=>
{
    const {name,email,password} = req.body;
    if(!email || !password || !name)
    {
        return res.status(422).json({error:"please add all fields"});
    }
    User.findOne({email:email})
    .then((savedUser)=>{
        if(savedUser){return res.status(422).json({error:"user already exists with that email"})}
        bcrypt.hash(password,11)
        .then(hashedpassword=>{
            const user = new  User({
                email,
                name,
                password: hashedpassword
            })
            user.save()
            .then(user=> {
                res.json({message:"saved successfully"})
            })
            .catch(err=>{console.log(err)})
        })
        
    })
    .catch(err=>{
        console.log(err);
    })
})

router.post('/login',(req,res)=>{
    const{email,password} = req.body
    if(!email || !password){
        res.status(422).json({error:"please add email or password"})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error:"no user found with that email id"});
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if(doMatch){
                //res.json({message:"successfully signed in"})
                const token = jwt.sign({_id:savedUser.id},JWT_SECRET);
                const {id,name,email}= savedUser;
                res.json({token,user:{id,name,email}});
            }
            else{
                return res.status(422).json({error:"Invalid email or password"})
            }
        })
        .catch(err=>{
            console.log(err);
        })
    })
})

module.exports = router;