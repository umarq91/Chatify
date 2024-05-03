const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

const usersSocketMap =  {}

const getReceiverSocketId = (receiverId) => {
	return usersSocketMap[receiverId];
};

io.on('connection', (socket) => {
 
  
  const userId = socket.handshake.query.userId;
  if (userId != "undefined") usersSocketMap[userId] = socket.id;
  io.emit('onlineusers', Object.keys(usersSocketMap));

  socket.on('joinchat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat ${chatId}`);
  });

  socket.on('newmessage', async (message) => {
    const { chat } = message;


    for (const user of chat?.users) {
      const receiverSocketId = usersSocketMap[user._id];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('messagereceived', message);
      }

    }
  
  });


  socket.on('typing',(room)=>{
   
  })

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    delete usersSocketMap[userId];
		io.emit("getOnlineUsers", Object.keys(usersSocketMap));
  });
});

module.exports = { io, server ,app , getReceiverSocketId};