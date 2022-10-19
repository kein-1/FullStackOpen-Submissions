require("dotenv").config();

const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
const SECRET = "randomstring";

const adding = "random str";
const adding2 = "random str";
const adding3 = "random str";
const adding4 = "random str";

module.exports = {
  PORT,
  MONGODB_URL,
  SECRET,
};
