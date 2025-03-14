const express=require("express")
//const mongoose=require("mongoose")
const app=express()
/*mongoose.connect("mongodb+srv://harinism26:6zVRS5NEqS7krAZM@cluster0.plk8d.mongodb.net/test")
const userSchema=new mongoose.Schema({
    name:String,
    age:Number
})
const userModel=mongoose.model("emp",userSchema);
const emp1=new userModel({
    name:"Harini",
    age:23
})
emp1.save();*/
app.get("/",(req,res)=>{
    res.status(200).send("LPage");
});
app.get("/about",(req,res)=>{
    res.status(200).send("APage");
});
const port=8000;
app.listen(port, ()=>{
    console.log(`Server is Running in http://127.0.0.1:${port}`);
});
