const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes")
const messageRoutes = require("./routes/messageRoutes")

const app = express();
const cookieParser = require('cookie-parser')
const {connectDB} =  require("./utils/db");
const { customError } = require("./middlewares/CustomError");
require("dotenv").config()
const cors = require('cors');
const authenticateToken = require("./middlewares/TokenVerification");
const { allusers } = require("./controllers/usersController");
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173',
    credentials: true // Allow cookies to be sent in requests
  }));


  app.use(cookieParser())
// DB Config
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/chat',chatRoutes)

app.use("/api/message",messageRoutes)


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 501;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: "false",
    message,
    statusCode,
  });
});


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));