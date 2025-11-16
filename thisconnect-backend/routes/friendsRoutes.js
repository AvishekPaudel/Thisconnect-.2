const express = require("express")
const friendsRouter = express.Router()
const User = require('../models/UserModel');


friendsRouter.post("/follow/:userId",async(req,res)=>{
  try {
    const userId = req.params.userId; 
    const currentUserId = req.session.userId; 

    if (userId === currentUserId) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: userId }
    });

    await User.findByIdAndUpdate(userId, {
      $addToSet: { followers: currentUserId }
    });

    res.status(200).json({ message: "Successfully followed user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


friendsRouter.post("/unfollow/:userId" ,async (req, res) => {
  try {
    const { userId } = req.params.userId;
    const currentUserId = req.session.userId;

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: userId }
    });

    await User.findByIdAndUpdate(userId, {
      $pull: { followers: currentUserId }
    });

    res.status(200).json({ message: "Successfully unfollowed user" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


friendsRouter.get("/followers/:userId",async(req,res)=>{
  try {
    const user = await User.findById(req.params.userId)
      .populate('followers', 'firstName lastName email');
    
    res.status(200).json({ followers: user.followers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


friendsRouter.get("/following/:userId",async(req,res)=>{
  try {
    const user = await User.findById(req.params.userId)
      .populate('following', 'firstName lastName email');
    
    res.status(200).json({ following: user.following });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})


friendsRouter.get("/friendsAndFollowing", async (req, res) => {
  try {
    const user = await User.findById(req.session.userId)
      .populate("followers", "firstName lastName email")
      .populate("following", "firstName lastName email");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      followers: user.followers,
      following: user.following,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = friendsRouter