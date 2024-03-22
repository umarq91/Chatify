const UserModel = require("../models/User.js");
const { customError } = require("../utils/CustomError.js");
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
    if (!validUser) return next(customError(404, 'User not found'));

    const validPassword = bcrypt.compareSync(password, validUser.password);
    if (!validPassword) return next(customError(401, 'wrong credentials'));
    
    const { password: hashedPassword, ...rest } = validUser._doc;
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    
    res
      .cookie("token", token, {
        sameSite: "None",
        httpOnly: true,
        secure: true,
      })
      .json({ success: true, user:rest });
  } catch (error) {
    next(error);
  }
};


const userVerification = (req, res) => {
  console.log("test");
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, usertoken) => {
      if (err) throw err;
      const { username, email, _id,avatar } = await UserModel.findById(
        usertoken.id
      );

      res.json({ username, email, _id,avatar  });
    });
  }
};



module.exports = { signIn, signUp,userVerification };
