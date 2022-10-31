const express = require("express");
const jsonwebtoken = require("jsonwebtoken");
const app = express();

const getTokenFrom = (request, response, next) => {
  //request has a headers property. This is like when we want to access the contents
  //of a POST request, we do request.body. However, "body" is NOT a header.
  //If we do request.get("body"), it won't work!
  //We can do request.headers to see all available headers

  //These three methods are the same to get the value of the "authorization" header
  // console.log(request.headers["authorization"]);
  // console.log(request.headers.authorization);
  // console.log(request.get("authorization"));
  // We can also get stuff like host name through request.get("host") or request.get("User-Agent")
  //but NOT request.get("body") to see contents since body is not a header
  if ("authorization" in request.headers) {
    authorization = request.header("Authorization");
    // console.log(`This is ${authorization}`);
    
    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      //Since authorization is a string, it consists of "bearer <tokenname>".
      //Doing substring(7) means we return the substring starting from index 7, which makes sense
      //since this returns the token itself and removes the bearer and space from the string
      //Here we extracted this as a middleware function and added a "token" field to the request object
      //The request object now has a new field called token
      request.token = authorization.substring(7);
    }
  }
  return next();
};

module.exports = getTokenFrom;
