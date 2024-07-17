const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");

exports.register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    status: "User created successfully",
    message: "Successfull",
    data: {
      fullName,
      email,
    },
  });
};
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await usersModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      status: "Invalid Credentials",
      message: "User Not Found",
    });

    return;
  }

  const doPasswordsMatch = bcrypt.compareSync(password, user.password);

  if (!doPasswordsMatch) {
    return res.status(401).json({
      status: "Invalid Credentials",
      message: "Check your Details",
    });
  }

  const userToken = jwt.sign(
    {
      userId: usersModel._id,
      fullName: usersModel.fullName,
      email: usersModel.email,
      role: usersModel.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  return res.status(200).json({
    status: "Login successful",
    message: "You have successfully logged in",
    userToken,
  });
};
