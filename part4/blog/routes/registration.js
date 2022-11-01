const express = require("express");
const registrationRouter = express.Router();
const User = require("../models/user");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")


registrationRouter.post("/", async (request, response) => {
  
  const { username, name, password } = request.body
  
  if (!username || !password ||!name) return response.status(400).json("Username, Password, or Name cannot be empty!")
  
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const new_user = new User({
      username,
      name,
      passwordHash,
  })

  const new_acc = await new_user.save()
  return response.status(200).json({user: new_acc, message: "user registered!"})
  
});


module.exports = registrationRouter