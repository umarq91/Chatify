const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Load User model
const User = require("../models/User");
const { signIn, signUp } = require("../controllers/authControllers");


router.post("/register",signUp);

router.post("/login",signIn)

module.exports = router;
