const mongoose=require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose")
const signIn= new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
   
})
signIn.plugin(passportLocalMongoose);
module.exports= new mongoose.model("SignIn",signIn);
