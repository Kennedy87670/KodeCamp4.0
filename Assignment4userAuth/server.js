require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoute = require("./routes/authRoute");

const app = express();
app.use(express.json());

app.use("/auth", authRoute);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
