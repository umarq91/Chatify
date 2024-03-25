const express =require('express');
const TokenVerification = require('../middlewares/TokenVerification');
const { accessChat, fetchChats } = require('../controllers/chatController');
const router = express.Router()



 router.route('/').post(TokenVerification,accessChat)
 router.route('/').get(TokenVerification,fetchChats)
// router.route('/group').post(tokenVerification,createGroupChat)
// router.route('/rename').put(tokenVerification,renameGroup)
// router.route('/removefromgroup').put(tokenVerification,removeFromGroup)
// router.route('/addingroup').post(tokenVerification,addToGroup)




module.exports = router