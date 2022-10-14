require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")

//This is the note model we exported from note.js
const Note = require("./models/note")

app.use(express.json())
app.use(express.static("build"))
app.use(cors())
app.set("json spaces", 2)

app.get("/", (request, response) => {
	response.send("<h1>Hello world!dsadasd!!</h1>")
})

app.get("/api/notes", (request, response) => {
	const find = async () => {
		const notes = await Note.find({})
		response.json(notes)
	}

	find()
})

app.get("/foobar", (request, response) => {
	response.send("<h1>Hello fool!!</h1>")
})

app.post("/api/notes", (request, response) => {
	const body = request.body

	if (body.content === undefined) {
		return response.status(400).json({ error: "content missing" })
	}

	const note = new Note({
		content: body.content,
		important: body.important || false,
		date: new Date()
	})

	note.save().then((savedNote) => {
		response.json(savedNote)
	})
})

app.get("/api/notes/:id", (request, response) => {
	const id = request.params.id

	const getNote = async () => {
		try {
			let note = await Note.findById(id)
			console.log("This is promise" + note)
			response.send(note)
			return note
		} catch (error) {
			console.log(error)
			console.log("DOES NOT EXIST")
			response.status(404).end()
		}
	}
	console.log("This ran here" + getNote())
	console.log("This is the note")
})

app.get("/api/notes/:id", (request, response) => {
	Note.findById(request.params.id).then((note) => {
		response.json(note)
	})
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
