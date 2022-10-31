const mongoose = require("mongoose");

const user = mongoose.Schema({
  username: {
    type: String,
    minLength: 3,
    unique: true,
    required: true,
  },
  //We define TYPE as a string but in Mongoose it is not a property. We cannot access it using user.type since Type in mongoose just defines what kind of data is stored here
  name: {
    type: String,
    minLength: 3,
  },
  passwordHash: {
    type: String,
    minLength: 3,
    required: true,
  },
  blogs: [
    {
      //Instead we are storing the IDs of the object notes.
      //the type here references the note id
      //In mongoose, TYPE defines the content type. It is not an actual property
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});

//Changes how the data returned to the front end is
//By default MongoDB creates __v and _id for every document
//We remove seeing those AND in this case we also remove seeing the password hash we generated
user.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model("User", user);
module.exports = User;
