import axios from "axios";

// const blogsUrl = 'http://localhost:3001/api/blogs'
const blogsUrl = "https://4rjbcc-3001.preview.csb.app/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  // console.log(`Token now is: ${token}`);
};

const getBlogs = async () => {
  const item = await axios.get(blogsUrl);
  return item.data;
};

const createBlog = async (obj) => {
  //This is passsed as an object to the 3rd parameter of axios.post.
  //Third parameter is how we want to pass stuff like headers
  const config = {
    headers: { Authorization: token },
  };

  //This is very interesting. Took me a long time to wrap my head around but:
  //How does axios know whether the post was sucecssful or not? Using await here means we are waiting for the POST request to complete. It turns out by default, axios throws an error anytime the server generates a status code of 4XX or 5XX
  //Notice that the code after the post request will NOT run if there is an error here because axios throws an error. So even if we export this to be used in our main app, we can still catch errors there with a try/catch block becasue axios will throw an error. Then await will detect an error and generate an exception, stopping the rest of the code and jumping straight to the catch block

  //Test what happens if you do the following code:
  //This will either return the newly made blog post OR the error response, which is an AxiosError
  //The front end which uses "await" in front of this function will ALWAYS run and not detect any errors since there is no actual error that is thrown. The actual error is actually here but it still returns a result

  //To be honest I prefer putting the try/catch block here and then in the main app that uses this function, I check if the returned status code is 200 (meaning it is good). I feel like this method makes a lot more sense and it is more intuitive
  try {
    const newBlog = await axios.post(blogsUrl, obj, config);
    console.log("Will run if no error");

    console.log(newBlog);
    return newBlog;
  } catch (error) {
    console.log("BACKEND ERROR IN MAKING A NEW BLOG");
    return error.response;
  }

  //By not using a try/catch here, await will throw an error, if there is one, since axios is a promised based function. Then in the function that calls this one, we use the try/catch block since inside that function, we call this one. If there is an error, this function throws an exception inside the try block because the "await" in front of this function
  //Its kind of like if we ran axios inside the catch block itself without putting it in a wrapper function. We still would put a try/catch

  //I guess we CAN do the try catch here and then in the front end we need to check the response. If it is a good response i.e it has the info we need, we run our code
  // const newBlog = await axios.post(blogsUrl, obj, config);
  // console.log("Will run if no error");
  // console.log(newBlog);
  // return newBlog.data

  //The function using this one
  /*
     const register = async (userObject) => {
    try{
      const registered_user = await registrationService(userObject)
      console.log("user was registered")
      setLoginStatus(false)
      console.log(registered_user)
    } catch (error) {
      console.log("bad registration")
      console.log(error)
    }

  }
  */
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  try {
    const response = await axios.delete(`${blogsUrl}/${id}`, config);
    console.log(response);
    return response;
  } catch (error) {
    console.log("BACKEND ERROR IN MAKING A DELETING A BLOG");
    return error.response;
  }
};

const addLikes = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  };

  //Axios adds the data we want to PUT inside the "body" field of the request object.
  //We can access this object using reuqest.body in the backend, just like a POSt request
  try {
    const response = await axios.put(`${blogsUrl}/${id}`, data, config);
    console.log("IN ADD LIKES");
    console.log(response);
    return response;
  } catch (error) {
    console.log("BACKEND ERROR IN ADDING A LIKE");
    return error.response;
  }
};

export { getBlogs, setToken, createBlog, deleteBlog, addLikes };
