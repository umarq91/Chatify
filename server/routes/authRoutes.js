const express = require("express");
const router = express.Router();
const { signIn, signUp, userVerification } = require("../controllers/authControllers");
const authenticateToken = require("../middlewares/TokenVerification");

router.post("/register",signUp);
router.post("/login",signIn)
router.get('/profile',userVerification)
router.get('/loggedIn',authenticateToken, (req, res) => {
    try {
        res.send(true)
    } catch (err) {
        res.json(false)
    }
})


module.exports = router;
