const express = require('express');
const http = require('http');
const User = require('../models/user');
const Message = require('../models/message');
const Friends = require('../models/friendList');
 

// const { Server } = require('socket.io');

const userSocketMap = {};

const socketHandler = (server, io) => {
  // const io = new Server(server);

  io.on('connection', socket => {
    console.log('A user is connected', socket.id);

    const userId = socket.handshake.query.userId;
    console.log("khjb",userId);
    
    if (userId !== 'undefined') {
      userSocketMap[userId] = socket.id;
    }
    console.log('user socket data', userSocketMap);

    socket.on('disconnect', () => {
      console.log('User disconnected', socket.id);
      delete userSocketMap[userId];
    });

    socket.on('sendMessage', async ({ senderId, receiverId, message }) => {
      console.log("yoo");
      console.log(userSocketMap);
      
      // const conversationId = senderId < receiverId? `${senderId}_${receiverId}`: `${receiverId}_${senderId}`;

      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('receiveMessage', { senderId, message });
      }
      
      // Save message to the database
      // const newMessage = new Message({ senderId, receiverId, message, conversationId });
      // await newMessage.save();
    });
  });
};

const routes = (app, io) => {
 
  app.post('/sendMessage', async (req, res) => {
    try {
      const { senderId, receiverId, message } = req.body;

      const conversationId = senderId < receiverId? `${senderId}_${receiverId}`: `${receiverId}_${senderId}`;


      const newMessage = new Message({
        senderId, 
        receiverId, 
        conversationId,
        message 
      });

      await newMessage.save();
      
      console.log(userSocketMap[receiverId]);
      
      const receiverSocketId = userSocketMap[receiverId];
      if (receiverSocketId) {
        console.log('emitting recieveMessage event to the reciver', receiverId);
        io.to(receiverSocketId).emit('newMessage', newMessage);
        // io.to(receiverSocketId).emit('receiveMessage', { senderId, message });
        // this one bro
      } else {
        console.log('Receiver socket ID not found.--', receiverSocketId);
      }

      res.status(201).json(newMessage);
    } catch (error) {
      console.error('Error', error);
      res.status(500).json({ message: 'Failed to send message' });
    }
  });

  app.get('/messages', async(req,res) => {
    try{
        const {conversationId} = req.query;
        const messages = await Message.find({conversationId}).populate('senderId', '_id name');
        
        res.status(200).json(messages);

    } catch(error) {
        console.log("Error bros", error);
    }
  });

  app.post('/makefriends', async(req, res) => {
    try{
        const {senderId, receiverId} = req.body;
        
        let sender = await Friends.findOne({ person: senderId });
        if (!sender) {
            // Create a new entry for sender if not found
            sender = new Friends({ person: senderId, friends: [receiverId] });
        } else if (!sender.friends.includes(receiverId)) {
            // Add receiverId to sender's friends if not already present
            sender.friends.push(receiverId);
        }
        await sender.save();

        // Handle receiverId
        let receiver = await Friends.findOne({ person: receiverId });
        if (!receiver) {
            // Create a new entry for receiver if not found
            receiver = new Friends({ person: receiverId, friends: [senderId] });
        } else if (!receiver.friends.includes(senderId)) {
            // Add senderId to receiver's friends if not already present
            receiver.friends.push(senderId);
        }
        await receiver.save();

        res.status(200).json({ message: "Friends updated successfully" });

    } catch(error) {
        console.log("error broski", error.message);
    }
  });
  // Add more routes as needed...
};

module.exports = { socketHandler, routes };
