const express =requie('express')
const router = express.Router()
const {tokenVerification} = require('../controllers/TokenVerification')


// router.route('/').post(tokenVerification,accessChats)
// router.route('/').get(tokenVerification,fetchChats)
// router.route('/group').post(tokenVerification,createGroupChat)
// router.route('/rename').put(tokenVerification,renameGroup)
// router.route('/removefromgroup').put(tokenVerification,removeFromGroup)
// router.route('/addingroup').post(tokenVerification,addToGroup)




module.exports = router