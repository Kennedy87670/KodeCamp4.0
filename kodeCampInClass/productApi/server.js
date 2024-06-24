const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE)
  .then((con) => {
    console.log("DB connection successfully");
  })
  .catch((err) => console.log("Error"));

// start server
const PORT = process.env.PORT || 7001;

const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}......`);
});
