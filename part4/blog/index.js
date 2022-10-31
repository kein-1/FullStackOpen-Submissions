const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

//This is a npm library that eliminates the need to use try/catch. Any errors will be automatically passed to the error handling funciton we setup
require("express-async-errors");
const { PORT, MONGODB_URL } = require("./utils/config");
const Blog = require("./models/blog");
const blogsRouter = require("./routes/blog");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registrationRouter = require("./routes/registration");

const errorHandler = require("./utils/errors");
const tokenExtractor = require("./utils/tokenExtractor");

mongoose.connect(MONGODB_URL, () => console.log("CONNECTED"));

//Formats your content so it looks better
app.set("json spaces", 2);
    
app.use(express.json());
app.use(express.static("build"));
app.use(cors());
app.use(tokenExtractor);

//Saying anything that starts with /api/blogs will use the router stuff we imported and basically add all those different routes to the end of this type of route
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/registration", registrationRouter);

//This is our middelware for error handling. Always put it at the end since middleware will load in the order they are defined
//Since we have the 'require('express-async-errors')' defined above, all errors in async functions will automatically run to this middelware
app.use(errorHandler);

app.listen(PORT, () => console.log(`Running on ${PORT}`));
