const express = require("express");
const router = express.Router();
const { signIn, signUp, userVerification, userLogout } = require("../controllers/authControllers");
const authenticateToken = require("../middlewares/TokenVerification");

router.post("/register",signUp);
router.post("/login",signIn)
router.get('/profile',authenticateToken,userVerification)
router.get('/logout',userLogout)


module.exports = router;
