const express = require("express");
const { allusers } = require("../controllers/usersController");
const authenticateToken = require("../middlewares/TokenVerification");
const router = express.Router();


router.get('/',allusers)

module.exports = router