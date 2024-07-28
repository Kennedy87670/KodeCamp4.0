
// server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const createError = require("http-errors");
const swaggerSetup = require("./swagger");
const cloudinary = require('cloudinary');

const adminRouter = require("./routes/admin");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const sharedRouter = require("./routes/shared")

const app = express();



// app.get("/emit-an-event", (req, res)=>{
//   try {
//     req.originalUrl.send("Hello this is an event fired from the emit-an-event endpoint")
//   res.status(200).json({
//     message: "Event emitted"
//   })
//   } catch (error) {
//     res.status(500).json({
//       message:"Internal server error"
//     })
//   }

// })

// Middleware setup
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

cloudinary.config({ 
  cloud_name:process.env.cloud_name ,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret
});

// Routes setup
app.use("/v1/auth", authRouter);
app.use("/v1/admin", adminRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/shared", sharedRouter )


// Setup Swagger
swaggerSetup(app);

// Root route handler
app.get("/", (req, res) => {
  res.send("Welcome to the Auth API");
});


// Error handling
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({
    message: res.locals.message,
    error: res.locals.error
  });
});

// Global exception handler for unmatched routes
app.all("*", (req, res) => {
  res.status(404).json({
    status: "Failed",
    message: `Cannot find ${req.originalUrl} on this server`,
  });
});


mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

module.exports = app;
