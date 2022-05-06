const express = require('express');
const router=express.Router();
var cron = require('node-cron');
require("../db/conn");

const nodemailer = require('nodemailer');
const User=require("../models/userSchema");
const Content=require("../models/contentSchema");

//user added in database
router.post("/addUser", async function (req,res){
    const {name,email}=req.body;
    if(!name || !email)
    {
        return res.status(422).json({error:"Please fill the fields properly"});
    }
    try{
    const user=new User({
            name,email
        });
    const isSuccess=await user.save();
       if(isSuccess)
       {
        res.status(201).json({message:"User stored successfully"});
       }
    }
    catch(err){
        console.log(err);
    }
});

module.exports=router;