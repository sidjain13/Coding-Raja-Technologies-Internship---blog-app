const mongoose=require('mongoose');

// schema 
const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    title:{
        type:String ,
        required:true
    },
    description:{
        type:String ,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
})

// model 
const Product1=new mongoose.model('blogData',productSchema);

module.exports=Product1;