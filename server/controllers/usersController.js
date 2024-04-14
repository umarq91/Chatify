const asyncHandler = require('express-async-handler');
const UserModel = require('../models/User');

const allusers = asyncHandler(async (req, res) => {
  const keyword = req.query.search;
  const loggedInUserId = req.user.id;

 
  const users = await UserModel.find({
    $and: [
      {
        $or: [
          { email: { $eq: keyword }},
          { username: { $eq: keyword}}
        ]
      },
      { _id: { $ne: loggedInUserId } } // Exclude the logged-in user
    ]
  });
 

  if (users.length === 0) {
    return res.json({ message: 'No users found' });
  }

  if (users.length > 1) {
    return res.status(400).json({ message: 'Multiple users found. Please refine your search.' });
  }

  const { password, ...rest } = users[0]._doc;
  res.json(rest);
});

module.exports = { allusers };
