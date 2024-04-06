// server side 
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const http = require("http");

const app = express();
const cookieParser = require('cookie-parser');
const { connectDB } =  require("./utils/db");
const { customError } = require("./middlewares/CustomError");
require("dotenv").config();
const { Server } = require("socket.io");
const cors = require('cors');
const authenticateToken = require("./middlewares/TokenVerification");
const { allusers } = require("./controllers/usersController");

// Bodyparser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true // Allow cookies to be sent in requests
}));
app.use(cookieParser());

// DB Config
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 501;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: "false",
    message,
    statusCode,
  });
});

// Create server and socket.io instance
const server = http.createServer(app);
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:5173",
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('joinchat', (chatId) => {
      socket.join(chatId); // Join the chat room
      console.log(`User joined chat ${chatId}`);
    });

  socket.on('newmessage', async (message) => {
    const { sender, content, chat } = message;
    const { _id: chatId } = chat;

    try {
      // ... logic to save message to database (if needed)
      io.to(chatId).emit('messagereceived', message);
    } catch (err) {
      console.error(err);
    }
  }); 

  socket.on('newChat', (chatData) => {
    // Save chatData to your database

    // Emit the new chat data to the appropriate client(s)
    io.emit('newChat', chatData); // You might want to emit to specific users instead of broadcasting to all
  });
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

// Define port and start listening
const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server up on port ${port}`));