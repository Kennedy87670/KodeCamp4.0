const User = require("../model/userModel");
const bcrypt = require("bcrypt");

exports.createUser = async (req, res) => {
  try {
    const userDetails = req.body;
    const hashedPassword = bcrypt.hashSync(userDetails.password, 10);
    const user = await User.create({
      username: userDetails.username,
      email: userDetails.email,
      password: hashedPassword,
    });
    res.status(201).json({
      status: "User created successfully",
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
  
      return res.status(200).json({
        status: "Login successful",
        message: "You have successfully logged in",
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: error.message,
      });
    }
  };

//   // 1. Check if email and password exist
//   if (!user) {
//     res.status(400).json({
//       status: "User Does not Exist",
//       message: email,
//     });
//     return;
//   }
//   const doPasswordsMatch = bcrypt.compareSync(password, user.password);

//   if (!doPasswordsMatch) {
//     res.status(400).json({
//       status: "User Password Does not Match",
//       message: email,
//     });

// return;
// }
