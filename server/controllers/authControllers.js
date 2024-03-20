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
