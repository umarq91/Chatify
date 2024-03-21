const asyncHandler = require('express-async-handler')
const UserModel = require('../models/User')

const allusers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  const loggedInUserId = req.user.id;

  const users = await UserModel.find({
    $and: [
      {
        $or: [
          { email: { $regex: keyword, $options: 'i' } },
          { username: { $regex: keyword, $options: 'i' } }
        ]
      },
      { _id: { $ne: loggedInUserId } } // Exclude the logged-in user
    ]
  });

  res.json(users);
});


module.exports = {allusers}