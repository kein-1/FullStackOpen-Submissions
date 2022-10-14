const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

const connect = async () => {
	try {
		// await mongoose.connect(url)
		const response = await mongoose.connect(url)
		console.log("connected!")
	} catch (error) {
		console.log("ERROR")
	}
}

connect()
const noteSchema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean
})

noteSchema.set("toJSON", {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})
const Note = mongoose.model("Note", noteSchema)

module.exports = Note
