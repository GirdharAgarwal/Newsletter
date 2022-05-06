const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please specify the name"]
    },
    email:{
        type:String,
        required:[true,"Please specify the email"]
    }
});
const User=mongoose.model("user",userSchema);

module.exports=User;


