const dotenv=require("dotenv");
const express=require("express");
const mongoose=require("mongoose");
const bodyParser = require("body-parser");

const app=express();

dotenv.config({path : './config.env'});
require("./db/conn.js");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json());
app.use(require("./router/auth"));

const PORT=process.env.PORT || 5000;

app.listen(PORT,function(){
    console.log(`Server started successfully on port : ${PORT}`);
})