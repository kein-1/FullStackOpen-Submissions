require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET = "randomstring";
const random = "random";
const random2 = "random";
const random3 = "random";



module.exports = {
  PORT,
  MONGODB_URL,
  SECRET,
};
