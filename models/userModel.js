const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    username:{
        type: String,
        required:[true,"Please enter a username"],
    },
    name:{
        type:String,
        required:[true, "Please enter a name"],
    },
    email:{
        type:String,
        required:[true,"Please enter a email adress"]
    },
    password:{
        type:String,
        required:[true,"Please enter a Password"]
    },
    
},
{
    timestamps:true,
});

module.exports=mongoose.model("user",userSchema);