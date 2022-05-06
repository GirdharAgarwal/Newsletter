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

//content added in database
router.post("/addContent",async function (req,res){
    const {topic,text,seconds,minutes,hours,dayofMonth,months,dayofWeek}=req.body;
    if(!topic || !text )
    {
        return res.status(422).json({error:"Please fill the fields properly"});
    }
    try{
    const content=new Content({
        topic,text,seconds,minutes,hours,dayofMonth,months,dayofWeek
        });
    const isSuccess=await content.save();
       if(isSuccess)
       {
        res.status(201).json({message:"Content stored successfully"});
       }
    }
    catch(err){
        console.log(err);
    }
});

//user subscribe the content
router.post("/Subscribe",async function(req,res){
    try{
        const {email,topic}=req.body;
        if(!email|| !topic)
            return res.status(400).json({error:"Please fill the fields properly"});
        const userExists=await User.findOne({email:email});
        const contentExists=await Content.findOne({topic:topic});
        if(userExists)
        {
            if(contentExists)
            {
                await contentExists.addSubscriber(email);
                return res.status(201).json({message:"User Subscription successful"});
            }
            else
            return res.status(400).json({error:"Invalid topic entered"});
        }
        else if(contentExists)
        {
            return res.status(400).json({error:"Invalid email entered"});
        }
        else
            res.status(400).json({error:"Invalid details entered"});
    }
    catch(err){
            console.log(err);
        }
});

//function to send email to provided userEmail
function sendEmail(seconds,minutes,hours,dayofMonth,months,dayofWeek,Text,userEmail)
{
    time=seconds+' '+minutes+' '+hours+' '+dayofMonth+' '+months+' '+dayofWeek;
    //console.log(time);
    cron.schedule(time, () => {
        var mailOptions = {
           from: process.env.USER,
           to: userEmail,
           subject: 'Newsletter',
           text: Text
        };

        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
           console.log(error);
        } 
        else {
           console.log('Email sent: ' + info.response);
        }
        });
    });
}

//function to select specific content 
function selectContent(content){
    seconds=content.seconds;
    minutes=content.minutes;
    hours=content.hours;
    dayofMonth=content.dayofMonth;
    months=content.months;
    dayofWeek=content.dayofWeek;
    subscribers=content.subscribers;
    text=content.text;
    for(let i=0;i<subscribers.length;i++)
    {
        sendEmail(seconds,minutes,hours,dayofMonth,months,dayofWeek,text,subscribers[i]);
    }
}

//to send email at a specific interval to users subscribed
router.post("/sendEmail", async (req, res, next) => {
    try{
        const content=await Content.find({});
        content.forEach(selectContent);
        return res.status(201).json({message:"Emails sent"});
    }
    catch(err)
    {
        return res.status(400).json({error:err});
    }
});

module.exports=router;