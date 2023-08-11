const express=require('express')
const router=express.Router();
const User=require('../models/User');
const bcrypt=require('bcrypt');
const { response } = require('express');


//1. register user

router.post('/register',async(req,res)=>{
   
    try {
        const salt=await bcrypt.genSalt(10);
        const hashedpassword=await bcrypt.hash(req.body.password,salt);
        const newUser= await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedpassword.toString(),
    
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json(error)
    }
})

// 2. Login user
router.post('/login',async(req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).send("user not found");
        }else{
            const validPassword = await bcrypt.compare(req.body.password,user.password);
            if(!validPassword){
                res.status(404).json(("wrong password"))
            }
            else{
                res.status(200).json(user)
            }       
        }
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get('/',(req, res)=>{
    res.send("auth routes")
})

module.exports=router;