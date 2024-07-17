const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const User = require("../model/userModel");
const UserToken = require("../model/userToken");
const { sendEmail } = require("../utils/emailUtil");

//

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
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

    const doPasswordsMatch = await bcrypt.compare(password, user.password);
    console.log("Entered Password:", password);
    console.log("Stored Hashed Password:", user.password);
    console.log("Passwords Match:", doPasswordsMatch);

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
      `Click the link to reset your password: ${resetLink} 
      the token  ${token}`
    );
    res.json({ message: "Password reset token sent" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// exports.resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;

//     // Find the user token in the database
//     const userToken = await UserToken.findOne({ token });
//     if (!userToken) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // Find the user associated with the token
//     const user = await User.findById(userToken.userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     console.log("New Password:", newPassword);
//     console.log("Hashed Password:", hashedPassword);

//     // Update the user's password and save
//     user.password = hashedPassword;
//     await user.save();

//     // Verify the saved password
//     const updatedUser = await User.findById(userToken.userId);
//     console.log("Stored Hashed Password:", updatedUser.password);

//     // Delete the used token from database (optional for security)
//     await UserToken.deleteOne({ token });

//     res.json({ message: "Password reset successfully" });
//   } catch (error) {
//     console.error("Error in resetPassword:", error);
//     res.status(400).json({ error: error.message });
//   }
// };

exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const userToken = await UserToken.findOne({ token });

    if (!userToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(userToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    console.log("New Password:", newPassword);
    console.log("Hashed Password:", hashedPassword);

    // Update the user's password and save
    user.password = hashedPassword;
    // user.password = newPassword;
    await user.save();
    console.log("Password updated in the database.");

    // Retrieve the updated user document and log the stored hashed password
    const updatedUser = await User.findById(userToken.userId);
    console.log("Stored Hashed Password after update:", updatedUser.password);

    // Delete the used token from the database (optional for security)
    await UserToken.deleteOne({ token });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
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

// exports.register = async (req, res) => {
//   try {
//     const { fullName, email, password } = req.body;
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res
//         .status(400)
//         .json({ message: "User with this email already exists" });
//     }
//     const user = new User({ fullName, email, password });
//     await user.save();
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
