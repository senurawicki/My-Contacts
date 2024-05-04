const asyncHandler=require("express-async-handler");
const User=require("../models/userModel");
const { param } = require("../routes/userRoutes");
const { json } = require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
//@desc register user
//@route POST api/user/register
//@access public
const registerUser=asyncHandler(async(req,res)=>{
    const{username,name,email,password}=req.body;
    if(!username||!name||!email||!password){
        res.status(400);
        throw new Error("All Fields needs to be filled");
    }
    
    const usernameAvailable=await User.findOne({username});
    if(usernameAvailable){
        res.status(404);
        throw new Error("Username taken");
    }
    const userAvailable=await User.findOne({email});
    if(userAvailable){
        res.status(404);
        throw new Error("User already rgistered");
    }
    
    //Hash Password
    const hashPassword=await bcrypt.hash(password, 10);
    const passwordAvailable=await User.findOne({password});
    
    
    console.log("Hash Password",hashPassword);
    const user=await User.create({
        username,
        name,
        email,
        password:hashPassword,
    });
    if(user){
        res.status(201).json({_id:user.id, email:user.email,name:user.name,username:user.username});
        
    }
    else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    
});

//@desc login user
//@route POST api/user/login
//access public
const loginUser=asyncHandler(async(req,res)=>{
    const{username,password}=req.body;
    if(!username||!password){
        res.status(400);
        throw new Error("All Fields needs to be filled");
    }
    const user=await User.findOne({username});
    //compare password with hash password
    if(user&&(await bcrypt.compare(password, user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.username,
                email:user.email,
                id:user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn:"40m"}
    );
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Email or password not valid");
    }
    
});

//@desc current user info
//@route GET api/user/current
//@access public
const currentUser=asyncHandler(async(req,res)=>{
    // const user=await User.find();
    res.json(req.user);
})



module.exports={
    registerUser,
    loginUser,
    currentUser
    
};