const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require("../models/usersModel");


exports.register = async (req, res, next) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  const user = await usersModel.create({
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