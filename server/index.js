const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const app = express();
const {connectDB} =  require("./utils/db");
const { notFoundError } = require("./middlewares/CustomError");
require("dotenv").config()

// Bodyparser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// DB Config
connectDB();

// Routes
app.use("/api/", userRoutes);


app.use(notFoundError)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));