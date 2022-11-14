//Express will recognize this as the error handling middleware because it has 4 arguments
const errorHandler = (error, response) => {
  console.error("WE ARE IN THE ERRORS");
  console.log("Errors are:");
  console.log(error);
  if (error.name === "CastError") {
    console.log(error);
    return response.status(404).json({ error: "no id exists.." });
  }
  if (error.name === "SyntaxError") {
    console.log(error.name);
    return response.status(404).json({ error: "some syntax problem.." });
  }
  if (error.name === "ReferenceError") {
    console.log(error.name);
    return response
      .status(404)
      .json({ errorType: error.name, error: error.message });
  }

  if (error.name === "ValidationError") {
    console.log(error);
    console.log(error.message);
    return response
      .status(404)
      .json({ errorType: error.name, error: error.message });
  }

  if (error.name === "MongoServerError") {
    console.log(error);
    console.log(error.message);
    return response
      .status(400)
      .json({ errorType: error.name, error: error.message });
  }

  //This is to catch JWT authorization errors
  if (error.name === "JsonWebTokenError") {
    console.log(error);
    return response
      .status(400)
      .json({ errorType: error.name, error: error.message });
  }

  return response.status(500).send("Something broke!");
};

module.exports = errorHandler;
