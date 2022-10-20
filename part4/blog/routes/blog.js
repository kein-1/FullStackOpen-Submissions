//This file utilizes express' router. It basically means we have all the routes in this file and then we import it into the main file. This is like a mini-app in itself. Router() works just like using express(). It has get, post etc
const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");
//Then we define the rest of our routes here. Good thing about router is we can cut off a lot of the base routes. So since we know our main route is say http://localhost:3001/api/blogs, we can make this the base url in the main file (see comment in export below) and then use the subsequent routes here

/*
For example: 
Without router: app.get("/api/blogs"...rest of code)
With router: app.get("/"...rest of code)
Notice how with router we cut off the beginning portion 
*/

blogRouter.get("/", async (request, response) => {
  let ans = await Blog.find({}).populate("user");
  console.log(ans);
  response.json(ans);
});

blogRouter.get("/:id", async (request, response) => {
  console.log(request.params);

  const id = request.params.id;
  let ans = await Blog.findById(id);
  console.log(ans);
  response.json(ans);
});

//Get the token from client to server
const getTokenFrom = (request) => {
  //request has a headers property. This is like when we want to access the contents
  //of a POST request, we do request.body

  //These two methods are the same to get the value of the "authorization" header
  // console.log(request.headers["authorization"]);
  // console.log(request.get("authorization"));

  //In express, we can extract the value of the "authorization" header through this
  const authorization = request.get("authorization");

  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.post("/", async (request, response) => {
  const token = getTokenFrom(request);
  console.log(token);
  return;
  const content = request.body;
  const creator = await User.findById(content.user_id);
  console.log(creator.blogs);
  console.log(creator._id);
  if (content.title && content.author) {
    const blog_post = new Blog({
      title: content.title,
      author: content.author,
      url: content.url,
      likes: content.likes,
      user: content.user_id,
    });

    //Returns the new blog post that is saved. We can take its ID object and pass it to our users which stores an array of blog IDs. So now we  \know which user created which post
    const new_post = await blog_post.save();

    console.log(new_post);
    creator.blogs = creator.blogs.concat(new_post._id);
    await creator.save();
    console.log("saved!");

    response.json(blog_post);
  } else {
    response.status(404).send("ADD TITLE");
  }
});

blogRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  let ans = await Blog.findById(id);
  let deletion = await Blog.deleteOne(ans);
  console.log(deletion);
  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const id = request.params.id;
  const content = request.body;
  let ans = await Blog.findById(id);
  ans.likes = content.likes;
  let final = await ans.save();
  console.log(ans);
  console.log(final);
  response.status(204).end();
});

//Then we can export it out. In our main file, we need to specifiy an
//app.use("BASE URL HERE", router we exported)
module.exports = blogRouter;
