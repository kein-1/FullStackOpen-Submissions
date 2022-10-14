const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require('mongoose')

const {PORT, MONGODB_URL} = require('./utils/config')
const Blog = require("./models/blog")
const router = require("./routes/blog")

mongoose.connect(MONGODB_URL, () => console.log("CONNECTED"))

app.set("json spaces", 2)

app.use(express.json())
app.use(express.static("build"))
app.use(cors())

//Saying anything that starts with /api/blogs will use the router stuff we imported and basically add all those different routes to the end of this type of route
app.use("/api/blogs",router)


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
