const { v4 } = require("uuid");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");
const { sendEmail } = require("../utils/emailUtil");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
  try {
    const userDetails = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email: userDetails.email });
    if (existingUser) {
      return res.status(500).json({
        status: "Error",
        message: "User with this email already exists",
      });
    }

    const hashedPassword = bcrypt.hashSync(userDetails.password, 10);
    const token = v4();
    const user = await User.create({
      username: userDetails.username,
      email: userDetails.email,
      password: hashedPassword,
      authToken: token,
      authPurpose: "verify-email",
    });

    await sendEmail(
      userDetails.email,
      "Verify Email",
      `Hello ${userDetails.username}, the link to verify your email is http://localhost:7000/api/users/verify-email/${token}`
    );
    res.status(201).json({
      status: "User created successfully",
      message: "Kindly check your email to verify it",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.verifyEmail = async (req, res) => {
  const { token } = req.params;

  try {
    const user = await User.findOne({
      authToken: token,
      authPurpose: "verify-email",
    });

    if (!user) {
      return res.status(500).json({
        isSuccessful: false,
        message: "User does not exist",
      });
    }

    user.isEmailVerified = true;
    user.authToken = null;
    user.authPurpose = null;
    await user.save();

    res.status(200).json({
      isSuccessful: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "Invalid Credentials",
      message: "Email and password are required",
    });
  }

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({
        status: "Invalid Credentials",
        message: "Invalid email or password",
      });
    }

    const doPasswordsMatch = bcrypt.compareSync(password, user.password);

    if (!doPasswordsMatch) {
      return res.status(401).json({
        status: "Invalid Credentials",
        message: "Invalid email or password",
      });
    }
    const userToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return res.status(200).json({
      status: "Login successful",
      message: "You have successfully logged in",
      userToken,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Error",
      message: error.message,
    });
  }
};
