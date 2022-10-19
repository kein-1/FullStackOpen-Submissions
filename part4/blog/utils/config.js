require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET = "randomstring";
const repeat = "repeat";
const repeat2 = "repeat";

module.exports = {
  PORT,
  MONGODB_URL,
  SECRET,
};
