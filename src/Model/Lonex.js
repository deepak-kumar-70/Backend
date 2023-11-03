const mongoose=require("mongoose")
const lonexSchemas=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    comfirmPassword:{
        type:String,
        required:true
    },
    images: {
      
        type:String,
        required:true,
      },
});
const user=mongoose.model("Lonex",lonexSchemas);
module.exports=user;