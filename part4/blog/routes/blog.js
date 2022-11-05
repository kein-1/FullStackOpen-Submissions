//This file utilizes express' router. It basically means we have all the routes in this file and then we import it into the main file. This is like a mini-app in itself. Router() works just like using express(). It has get, post etc
const express = require("express");
const blogRouter = express.Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const userExtractor = require("../utils/userExtractor");

//Then we define the rest of our routes here. Good thing about router is we can cut off a lot of the base routes. So since we know our main route is say http://localhost:3001/api/blogs, we can make this the base url in the main file (see comment in export below) and then use the subsequent routes here

/*
For example: 
Without router: app.get("/api/blogs"...rest of code)
With router: app.get("/"...rest of code)
Notice how with router we cut off the beginning portion 
*/

blogRouter.get("/", async (request, response) => {
  let ans = await Blog.find({});
  response.json(ans);
});

blogRouter.get("/:id", async (request, response) => {
  console.log(request.params);

  const id = request.params.id;
  let ans = await Blog.findById(id);
  response.json(ans);
});

//Get the token from client to server. This was extracted to a middleware called tokenExtractor.js. We are also passing in a route-specific middleware called userExtractor. This is loaded after the token extractor and it is used to figure out who the token belongs to

blogRouter.post("/", userExtractor, async (request, response) => {
  const content = request.body;

  //We passed the handling to a middleware function. The function added the "token" property to the request object
  //We also passed extracting the user into a middleware defined here. That middleware will add a "request.user" attribute to the request object before it reaches this route's logic

  const token = request.token;
  const user = request.user;
  console.log("*******");
  // console.log(request);
  // console.log(request.headers);
  // console.log(token);
  // console.log(user);
  // console.log(content);

  const creator = await User.findById(user);
  console.log(creator);
  console.log('*****');

  if (content.title && content.author) {
    const blog_post = new Blog({
      title: content.title,
      author: content.author,
      url: content.url,
      likes: content.likes || 0,
      user: user,
      content: content.content,
    });

    //Returns the new blog post that is saved. We can take its ID object and pass it to our users which stores an array of blog IDs. So now we  \know which user created which post
    const new_post = await blog_post.save();

    creator.blogs = creator.blogs.concat(new_post._id);
    await creator.save();

    console.log(blog_post);
    console.log("saved!");

    response.json(blog_post);
  } else {
    response.status(400).send("MISSING TITLE AND AUTHOR");
  }
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const blogId = request.params.id;
  console.log(`In blog id ${blogId}`);

  if (!request.token) return response.json({ error: "Missing token" });

  //Get both the user and the blog from our database
  const blogObj = await Blog.findById(blogId);
  const userObj = await User.findById(request.user);

  //This is important. Need to check whether the blog's user id field
  // (since each blog has a unique user associated to it) matches with the user making the request
  if (blogObj.user.toString() == request.user) {
    //Delete the blog in our blog collections
    const deletion = await Blog.deleteOne(blogObj);
    console.log(deletion);

    //Update the user blog info in database since we deleted an associated blog
    userObj.blogs = userObj.blogs.filter(
      (element) => element.toString() !== blogId
    );
    userObj.save();

    return response.status(204).send("Blog deleted");
  } else {
    return response.json({
      Message: "Not authorized to delete this",
      requestedUser: request.user,
      ownerOfBlog: blogObj.user.toString(),
    });
  }
});

blogRouter.put("/:id", userExtractor, async (request, response) => {
  console.log("IN PUT");

  const blogId = request.params.id;
  const newContent = request.body;
  console.log("This is new content");
  console.log(newContent);
  if (!request.token)
    return response.status(400).json({ error: "Missing token" });

  //Uses the findbyIdAndUpdateMethod here to add hte likes. newContent is an object
  const blogObj = await Blog.findByIdAndUpdate(blogId, newContent, {
    new: true,
  });

  console.log("*********");
  console.log(blogObj);
  console.log("*********");

  console.log("updated blog post with a new like");
  //Remember in axios in our frontend, we can access the returned response using the ".data" property
  return response.status(200).json(blogObj);
});

//Then we can export it out. In our main file, we need to specifiy an
//app.use("BASE URL HERE", router we exported)
module.exports = blogRouter;
