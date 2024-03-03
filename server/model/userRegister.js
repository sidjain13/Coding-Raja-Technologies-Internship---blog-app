const mongoose=require('mongoose');

// schema 
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String ,
        required:true
    }
})

// model 
const User1=new mongoose.model('users',userSchema);

module.exports=User1;