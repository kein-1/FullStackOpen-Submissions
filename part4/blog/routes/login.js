require("dotenv").config();
const express = require("express");
const loginRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

//Check if the user is in the system. If so, we check if the password entered
//is correct
loginRouter.post("/", async (request, response) => {
  const { username, password } = request.body;

  //Find returns an array. Probably better to use findOne
  //ES6 style: if key and value are the same, we can just specify one value
  const person = await User.find({ username });

  //Compare the password that was passed with the hashed password using bcrypt since the actual passwords are not stored in the database
  const passwordCorrect =
    person.length === 0
      ? false
      : await bcrypt.compare(password, person[0].passwordHash);

  if (!(passwordCorrect && person.length !== 0))
    return response.status(400).send("Wrong UserName & Password!");

  const userForToken = {
    username: person[0].username,
    id: person[0]._id,
    dateMade: new Date().toLocaleString(),
  };

  //What this does is add the "payload" as the first parameter and second parameter is the secret key
  //This is how this is all signed. We pass in whatever waant to the first parameter. Here, we pass in both the username and the id we retrieved from the database, and then also a date object
  const token = jsonwebtoken.sign(userForToken, process.env.SECRET);
  response
    .status(200)
    .json({
      token,
      username: person[0].username,
      name: person[0].name,
      id: person[0].id,
    });
});

loginRouter.get("/", async (request, response) => {
  console.log("login page get request");
  response.end();
});

module.exports = loginRouter;
