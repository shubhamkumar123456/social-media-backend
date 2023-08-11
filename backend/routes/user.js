const express = require('express')
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')

//1.) update user
router.put('/:id', async (req, res) => {
    // const {username,password,profilePicture,coverPicture} = req.body;
    // try {
    //     const updateUser={};
    //     if(username){updateUser.username = username};
    //     if(coverPicture){updateUser.coverPicture = coverPicture};
    //     if(profilePicture){updateUser.profilePicture = profilePicture};
    //     if(password){
    //         const salt=await bcrypt.genSalt(10);
    //         const hashedpassword = await bcrypt.hash(password, salt);
    //         updateUser.password = hashedpassword;
    //     }
    //     let user= await User.findById(req.params.id);
    //     if(!user){return res.status(404).send("user not found")};
    //     user=await User.findByIdAndUpdate(req.params.id,{$set:updateUser},{new:true})
    //     res.json(user);
    // } catch (error) {
    //     console.error(error.message);
    //     return res.status(500).json(error)
    // }

    if (req.body.userId === req.params.id || req.body.isAdmin) {
        if (req.body.password) {
            try {
                const salt=await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
                // console.log(req.body.password)
            } catch (error) {
                return res.status(500).json(error)
            }
        }
        try {
            const user = await User.findByIdAndUpdate(req.params.id, { 
                $set: req.body,
             });
            res.status(200).json("Account updated successfully")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can update only your accoun")
    }
})

//2.) delete user
router.delete('/:id', async (req, res) => {
    if (req.body.userId === req.params.id || req.body.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.params.id);
            // console.log(user)
            res.status(200).json("Account deleted successfully")
        } catch (error) {
            return res.status(500).json(error)
        }
    } else {
        return res.status(403).json("you can delete only your account")
    }
})
// get a user
router.get('/',async(req,res)=>{
    const userId=req.query.userId;
    const username=req.query.username;
    try {
        const user=userId? await User.findById(userId): await User.findOne({username: username});
        const {password,updatedAt, ...other} = user._doc
        res.status(200).json(other)
    } catch (error) {
        res.status(500).json(error)
    }
})

// get friends
router.get('/friends/:userId',async(req,res)=>{
    try {
        const user=await User.findById(req.params.userId);
        const friends=await Promise.all(
            user.followings.map(friendId=>{
                return User.findById(friendId)
            })
        )
        let friendList=[];
        friends.map(friend=>{
            const {_id,username,profilePicture}=friend;
            friendList.push({_id,username,profilePicture})
        });
        res.status(200).json(friendList)
    } catch (error) {
        res.status(500).json(error)
    }
})

// follow a user
router.put('/:id/follow',async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId)
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push:{followers:req.body.userId}})
                await currentUser.updateOne({$push:{followings:req.params.id}})
                res.status(200).json("user has been followed")
            }else{
                res.status(403).json("you already follow this user")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("you can not follow yourself")
    }
})

// unfollow a user
router.put('/:id/unfollow',async(req,res)=>{
    if(req.body.userId!==req.params.id){
        try {
            const user = await User.findById(req.params.id);
            const currentUser= await User.findById(req.body.userId)
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull:{followers:req.body.userId}})
                await currentUser.updateOne({$pull:{followings:req.params.id}})
                res.status(200).json("user has been unfollowed")
            }else{
                res.status(403).json("you are no longer following this user")
            }
        } catch (error) {
            res.status(500).json(error);
        }
    }else{
        res.status(403).json("you can not unfollow yourself")
    }
})

module.exports = router;