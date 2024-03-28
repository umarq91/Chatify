const express =require('express');
const TokenVerification = require('../middlewares/TokenVerification');
const { sendMessage, fetchMessages } = require('../controllers/messageController');
const router = express.Router();


 router.route('/').post(TokenVerification,sendMessage)
 router.route('/:chatId').get(TokenVerification,fetchMessages)


module.exports = router