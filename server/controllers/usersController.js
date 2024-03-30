const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User');

const allusers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  const loggedInUserId = req.user.id;
console.log(loggedInUserId,keyword);
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

  if (users.length === 0) {
    return res.json({ message: 'No users found' });
  }

  const { password, ...rest } = users[0]._doc;
  res.json(rest);
});

module.exports = { allusers };
