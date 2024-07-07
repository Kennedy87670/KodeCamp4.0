const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const UserToken = require("../model/userToken");
const { sendEmail } = require("../utils/emailUtil");

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }
    const user = new User({ fullName, email, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = uuidv4();
    await new UserToken({ userId: user._id, token }).save();
    const resetLink = `http://localhost:7001/reset-password/${token}`;
    await sendEmail(
      email,
      "Forgot Password",
      `Click the link to reset your password: ${resetLink}`
    );
    res.json({ message: "Password reset token sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const userToken = await UserToken.findOne({ token });
    if (!userToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    const user = await User.findById(userToken.userId);
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();
    await UserToken.deleteOne({ token });
    res.json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.profile = async (req, res) => {
  try {
    const user = await User.findById(req.userDetails.userId).select(
      "fullName email"
    );
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
