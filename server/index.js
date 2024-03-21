const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();
const cookieParser = require('cookie-parser')
const {connectDB} =  require("./utils/db");
const { notFoundError } = require("./middlewares/CustomError");
require("dotenv").config()
const cors = require('cors');
const authenticateToken = require("./controllers/TokenVerification");
const { allusers } = require("./controllers/usersController");
// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:5173', // Replace with your frontend origin
    credentials: true // Allow cookies to be sent in requests
  }));


  app.use(cookieParser())
// DB Config
connectDB();

// Routes
app.use("/api/", userRoutes);

app.get("/api/test",authenticateToken, allusers)
app.use(notFoundError)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));