const jwt = require("jsonwebtoken");

function checkIfLoggedIn(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(403).json({
      message: "No token present",
    });
  }

  const authToken = authHeader.split(" ");
  const strategy = authToken[0];
  const tokenItself = authToken[1];

  if (strategy !== "Bearer") {
    return res.status(500).json({
      status: "Invalid Auth Strategy",
      message: "User is not logged in",
    });
  }

  try {
    const userDetails = jwt.verify(tokenItself, process.env.JWT_SECRET);
    req.userDetails = userDetails;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired",
      });
    } else {
      return res.status(401).json({
        message: "Invalid token",
      });
    }
  }
}
