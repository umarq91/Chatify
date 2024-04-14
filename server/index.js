const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { connectDB } = require("./utils/db");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const {app,server} = require("./soocket/socket.js");
require("dotenv").config();


// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Database Connection
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/chat', chatRoutes);
app.use("/api/message", messageRoutes);


server.listen(process.env.PORT || 5000, () => {
  console.log(`Server started on port ${process.env.PORT || 5000}`);
})
module.exports = app;
