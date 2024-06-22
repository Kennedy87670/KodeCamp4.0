const app = require("./index");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

// start server
const PORT = process.env.PORT || 7001;

const server = app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}......`);
});
