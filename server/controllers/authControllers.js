const UserModel = require("../models/User.js");
const { ErrorHandling } = require("../middlewares/CustomError.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
let salt = bcrypt.genSaltSync(10);

const signUp = async (req, res, next) => {
  const { username, password, email ,avatar} = req.body;

  try {
    // check if username already exists
    let check = await UserModel.find({ username });
    let hashedpassword = bcrypt.hashSync(password, salt);

    const user = await UserModel.create({
      username,
      email,
      password: hashedpassword,
      avatar
    });
    res.json({ success: "true", user });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    let validUser = await UserModel.findOne({ email });
    if (!validUser) return next(ErrorHandling(401, "User not Found"));

    let validpassword = bcrypt.compareSync(password, validUser.password);
    if (!validpassword)
      return next(ErrorHandling(401, "passord did not matched"));

    //  its not safe to send validUser array complete because there is a password field too so we get the password field out from that
    const { password: hashedpassword, ...rest } = validUser._doc;

    // Generate a token
    const token = jwt.sign({ id: validUser._id }, process.env.secret, {
      expiresIn: "1h",
    });

    // send the token , 2 ways
    //1 -  res.cookie('token', token).json(rest);
    let data = {
      token: token,
      data: rest,
    };
    res.json(data);
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn, signUp };
