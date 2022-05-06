const mongoose=require("mongoose");

const contentSchema=new mongoose.Schema({
    topic:{
        type:String,
        required:[true,"Please specify the topic"]
    },
    text:{
        type:String,
        required:[true,"Please specify the text"]
    },
    seconds:{ type: String, min: '0', max: '59' },
    minutes:{ type: String, min: '0', max: '59' },
    hours:{ type: String, min: '0', max: '23' },
    dayofMonth:{ type: String, min: '1', max: '31' },
    months:{ type: String, min: '1', max: '12' },
    dayofWeek:{ type: String, min: '0', max: '6' },
    subscribers:[String]
});

contentSchema.methods.addSubscriber=async function(email){
    try{
        this.subscribers=[...this.subscribers,email];
        await this.save();
    }
    catch(err)
    {
        console.log(err);
    }
}
const Content=mongoose.model("content",contentSchema);

module.exports=Content;
