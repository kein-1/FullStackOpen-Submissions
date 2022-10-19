require("dotenv").config();
const express = require("express");
const loginRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const { SECRET } = require("../utils/config");

//Check if the user is in the system. If so, we check if the password entered
//is correct
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  //Find returns an array. Probably better to use findOne
  const person = await User.find({ username: username });

  if (person === undefined || person.length == 0)
    return response.status(401).send("User not found!");

  //Compare the password that was passed with the hashed password using bcrypt since the actual passwords are not stored in the database
  const passwordCorrect = await bcrypt.compare(
    password,
    person[0].passwordHash
  );

  if (!passwordCorrect) return response.status(401).send("Wrong password!");

  const userForToken = {
    username: person[0].username,
    id: person[0]._id,
  };

  const token = jsonwebtoken.sign(userForToken, process.env.SECRET);

  response
    .status(220)
    .json({ token, username: person[0].username, name: person[0].name });
});

module.exports = loginRouter;
