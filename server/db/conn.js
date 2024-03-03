const mongoose=require("mongoose");

const db=process.env.DATABASE

// database connection 
mongoose.connect(db).then(()=>{
    console.log("connection successfull");
})
.catch(()=>{
    console.log('error');
})