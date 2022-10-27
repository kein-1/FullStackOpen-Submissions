require("dotenv").config();
const jsonwebtoken = require("jsonwebtoken");

//This is a middleware that is loaded after the token is loaded and added to request
const userExtractor = async (request, response, next) => {
  //Was running into erriors here when this was running error with token even though I was making a get request. I thought this should only run in the POST request route since I made it route specific

  if ("token" in request) {
    const token = request.token;
    //This verifies the user passed in with the token
    //The verifiedToken is an object that is based on what we added as the
    //payload when we signed and generated the token
    const verifiedToken = await jsonwebtoken.verify(token, process.env.SECRET);

    //Now here we add a user field to request as an id from the verifiedToken
    request.user = verifiedToken.id;
  }

  return next();
};

module.exports = userExtractor;
