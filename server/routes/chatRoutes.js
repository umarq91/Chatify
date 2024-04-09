const express =require('express');
const TokenVerification = require('../middlewares/TokenVerification');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup, leaveChat } = require('../controllers/chatController');
const router = express.Router()



 router.route('/').post(TokenVerification,accessChat)
 router.route('/').get(TokenVerification,fetchChats)
 router.route('/group').post(TokenVerification,createGroupChat)
 router.route('/rename').put(TokenVerification,renameGroup)
 router.route('/addingroup').post(TokenVerification,addToGroup)
router.route('/removefromgroup').put(TokenVerification,removeFromGroup)
router.route('/leaveChat').put(TokenVerification,leaveChat)



module.exports = router