const bcrypt = require('bcrypt')
const express = require('express')
const usersRouter = express.Router()
const User = require('../models/user')
const mongoose = require('mongoose')




usersRouter.get('/', async (request,response) => {

    // const all_notes = await User.find({}).populate("blogs")
    const all_notes = await User.find({})

	console.log(all_notes)
    response.json(all_notes)
})

usersRouter.post('/', async (request, response) => {
	const { username, name, password} = request.body

	//Save the password as a HASH in our database
	const saltRounds = 10
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username,
		name,
		passwordHash,
	})

	const savedUser = await user.save()

	response.status(201).json(savedUser)
})

module.exports = usersRouter