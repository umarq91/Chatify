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

const onlineUsersArray = [];

io.on('connection', (socket) => {
  console.log("user connected");
  const userId = socket.handshake.query.userId;
  onlineUsersArray.push(userId);
  io.emit('onlineusers', onlineUsersArray);

  socket.on('joinchat', (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat ${chatId}`);
  });

  socket.on('newmessage', async (message) => {
    const { chat } = message;
    io.to(chat._id).emit('messagereceived', message);
  });



  socket.on('disconnect', () => {
    console.log('A user disconnected');
    const index = onlineUsersArray.indexOf(userId);
    if (index !== -1) {
      onlineUsersArray.splice(index, 1);
    }
    io.emit("onlineusers", onlineUsersArray);
  });
});

module.exports = { io, server ,app};
