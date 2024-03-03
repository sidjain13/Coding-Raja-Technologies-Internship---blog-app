const express=require('express');
const dotenv=require('dotenv')      //for env files 
const app=express();
const bodyParser = require('body-parser');
const mongoose=require('mongoose');
const cors=require('cors')
const cookieParser = require('cookie-parser');

const port=5000;

dotenv.config({path:'./conn.env'});   //for conn . env file 
require('./db/conn')                    // for database file 

const user2=require('./model/userRegister');  // for userSchema and model 
const product2=require('./model/blogInsert');  // for productSchema and model 

app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.json());



app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}))






// register page 
app.post('/register',async(req,res)=>{

    const {name1,password1}=req.body;

    if(!name1 || !password1){
        return res.status(400).json({error:'plz fill correctly'});
    }

    try{

        const result=new user2({
            name:req.body.name1,
            password:req.body.password1,
        })

        const result1=await result.save();
        // console.log(result1);
        return res.status(200).json({msg:'user registered successfully'})
        
    }
    catch(err){
        console.log(err);
    }
})





// for login page  
app.post('/login',async(req,res)=>{

    try{
        const {name1,password1}=req.body;

        if(!name1 || !password1){
            return res.status(400).json({error:"plz fill correctly"});
        }

        const findLogin=await user2.findOne({name:name1});

        if(!findLogin){
            return res.status(400).json({error:"login fail"});
        }

        if(password1==findLogin.password){
            res.cookie('name',findLogin.name,{ 
                expires:new Date(Date.now() + 3000000000 ),   //cookie expiring time
                httpOnly:true,
                secure:true,    
            });
            return res.status(200).json({msg:"login success"});
        }
        else{
            return res.status(200).json({error:"login fail"});
        }
    }

    catch(err){
        console.log(err);
    }
    
    
})

// home page 
app.get('/providingCookieDetail',async(req,res)=>{
    const detailCookie=req.cookies.name;
    // console.log(detailCookie);
    res.json(detailCookie);
})


// logout ka code 
app.get('/logout',async(req,res)=>{
    res.clearCookie("name");
    return res.json('logout success');
})



// blog create 

// register page 
app.post('/create',async(req,res)=>{
    
    const name1=req.cookies.name;
    // console.log(name1);

    const {title1,description1}=req.body;

    if(!title1 || !description1){
        return res.status(400).json({error:'plz fill correctly'});
    }

    try{

        const result=new product2({
            name:req.cookies.name,
            title:req.body.title1,
            description:req.body.description1,
        })

        const result1=await result.save();
        // console.log(result1);
        return res.status(200).json({msg:'blog created successfully'})
        
    }
    catch(err){
        console.log(err);
    }
})




// providing blog data 
app.get('/gettingBlogs',async(req,res)=>{
    console.log(req.cookies.name);
    const data=await product2.find({name:req.cookies.name})      //database me find karega uss particular email wale data ko 
    // console.log(data);
    res.send(data)  
})



// blog delete 

app.post('/blogDelete',async(req,res)=>{
    const {name,title}=req.body;
    const data=await product2.deleteOne({name:name,title:title})      //database me find karega uss particular email wale data ko 
    
    console.log('blog deleted')
    
    
})


// blog edit 
app.post('/blogEdit',async(req,res)=>{
    const {name,title}=req.body;
    // console.log(title)
    res.cookie('title',title,{ 
        expires:new Date(Date.now() + 3000000000 ),   //cookie expiring time
        httpOnly:true,
        secure:true,    
    });
    res.status(200).json({msg:"blog edit"})
})


// updating blog 
app.post('/blogUpdate',async(req,res)=>{

    console.log(req.cookies.name)
    console.log(req.cookies.title)
    
    const {title1,description1}=req.body;
    
    if(!title1 || !description1){
        return res.status(400).json({error:'plz fill correctly'});
    }
    
    try{
        
        // const data=await product2.updateOne({{name:req.cookies.name},{$set:{title:title1}})      //database me find karega uss particular email wale data ko 
        const data=await product2.updateOne({$and:[{name:req.cookies.name},{title:req.cookies.title}]},{$set:{title:title1,description:description1}})      //database me find karega uss particular email wale data ko 

        console.log(data);
        return res.status(200).json({msg:'blog updated successfully'})
        
    }
    catch(err){
        console.log(err);
    }
})




app.listen(port,()=>{
    console.log('hello');
})