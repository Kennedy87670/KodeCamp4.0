const express = require("express");
const logger = require("morgan");

const authRoute = require("./routes/authRoute");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/auth", authRoute);

// Global exception handler for unmatched routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
