const pusher = require("../server/pusher")
const express = require("express")
const messageRouter = express.Router()

const User = require('../models/UserModel')
const { Message } = require('../models/FollowerModel');



messageRouter.post("/sendmessage", async (req, res) => {
  try {
    const { recipientId, content } = req.body;
    const senderId = req.session.userId; 

    if (recipientId === senderId) {
      return res.status(400).json({ message: "You cannot message yourself" });
    }

    const sender = await User.findById(senderId);
    if (!sender.following.includes(recipientId)) {
      return res.status(403).json({ 
        message: "You must follow this user to send messages" 
      });
    }

    const message = new Message({
      sender: senderId,
      recipient: recipientId,
      content,
    });

    await message.save();

    pusher.trigger(`private-chat-${recipientId}`, "new-message", {
      senderId,
      recipientId,
      content,
      createdAt: message.createdAt,
    });

    res.status(201).json({ 
      message: "Message sent successfully",
      data: message 
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


messageRouter.post("conversation/:userId",async(req,res)=>{
  try {
    const { userId } = req.params;
    const currentUserId = req.user.id;

    const messages = await Message.find({
      $or: [
        { sender: currentUserId, recipient: userId },
        { sender: userId, recipient: currentUserId }
      ]
    })
    .sort({ createdAt: 1 })
    .populate('sender', 'firstName lastName')
    .populate('recipient', 'firstName lastName');

    res.status(200).json({ messages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

module.exports = messageRouter