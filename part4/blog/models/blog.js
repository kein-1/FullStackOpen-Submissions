const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  url: String,
  title: String,
  author: String,
  likes: Number,
  user: {
    //Type is an ID of the ref object. The ref needs to match up to the collection name we used when we made the User collection. In MongoDB, this will appear as users since it automatically makese it lowercase and plural
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  content: String,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
