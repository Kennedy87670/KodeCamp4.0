const express = require("express");
const logger = require("morgan");
const productRoutes = require("./routes/productsRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

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
