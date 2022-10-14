

//This file utilizes express' router. It basically means we have all the routes in this file and then we import it into the main file. This is like a mini-app in itself. Router() works just like using express(). It has get, post etc 
const express = require('express')
const router = express.Router()
const Blog = require("../models/blog")

//Then we define the rest of our routes here. Good thing about router is we can cut off a lot of the base routes. So since we know our main route is say http://localhost:3001/api/blogs, we can make this the base url in the main file (see comment in export below) and then use the subsequent routes here

/*
For example: 
Without router: app.get("/api/blogs"...rest of code)
With router: app.get("/"...rest of code)
Notice how with router we cut off the beginning portion 
*/

router.get("/", (request, response) => {
	try{
		const get_all = async () => {
			let ans = await Blog.find({})
			console.log(ans)
			response.json(ans)
		}
		get_all()
	}
	catch (error) {
		console.log(error)
	}
})

router.get("/:id", (request, response) => {
	
	const id = request.params.id
	try{
		const get_individual = async () => {
			let ans = await Blog.findById(id)
			console.log(ans)
			response.json(ans)
		}
		get_individual()
	}
	catch (error) {
		console.log(error)
	}
})

router.post("/", (request, response) => {
	
	const content = request.body
	console.log(content)

	try{
		const add_blog = async () => {
			const blog_post = new Blog({
				title: content.title,
				author: content.author,
				url : content.url,
				likes : content.likes
			})
			await blog_post.save()
			console.log("saved!")
			response.json(blog_post)
		}

		add_blog()
	}
	catch (error) {
		console.log(error)
	}
	
})


//Then we can export it out. In our main file, we need to specifiy an
//app.use("BASE URL HERE", router we exported)
module.exports = router