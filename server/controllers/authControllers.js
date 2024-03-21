const UserModel = require("../models/User.js");
const { ErrorHandling } = require("../middlewares/CustomError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);

const signUp = async (req, res, next) => {
  const { username, password, email } = req.body;

  try {
    // check if username already exists
    let existingUser = await UserModel.find({ email })
    
    if (existingUser.length>0) {
      // If the email already exists, return an error response to the frontend
      return res.status(400).json({ error: "Email already exists" });
    }

    let hashedpassword = bcrypt.hashSync(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedpassword,
    });

    const { password: userPassword, ...rest } = user._doc;
    res.json({ success: "true", user:rest });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await UserModel.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'User not found'));
    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'wrong credentials'));
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000); // 1 hour
    res
      .cookie('token', token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn, signUp };
