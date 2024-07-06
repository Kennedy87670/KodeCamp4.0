const express = require("express");
const logger = require("morgan");
const productRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(function (req, res, next) {
  console.log(" first middleware executed");
  res.send("Service is under maintainance");
  // next();
});
app.use(function (req, res, next) {
  console.log("Second middleware executed");
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger("dev"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

// Global exception handler for unmatched routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
