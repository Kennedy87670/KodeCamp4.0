const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.use("/api/v1/tasks", taskRoutes);

// Global exception handler for unmatched routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: "Failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});

module.exports = app;
