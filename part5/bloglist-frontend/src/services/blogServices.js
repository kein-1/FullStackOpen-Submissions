import axios from "axios";


// const blogsUrl = 'http://localhost:3001/api/blogs'

// const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";
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
  console.log("Backend run");
  
  const newBlog = await axios.post(blogsUrl, obj, config);
  console.log("Will run if no error");

  console.log(newBlog);
  return newBlog.data
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  
  const response = await axios.delete(`${blogsUrl}/${id}`,config);
  console.log(response)
  return response
};


const addLikes = async (id,data) => {
  const config = {
    headers: { Authorization: token },
  };
  
  //Axios adds the data we want to PUT inside the "body" field of the request object.
  //We can access this object using reuqest.body in the backend, just like a POSt request 
  const response = await axios.put(`${blogsUrl}/${id}`, data, config);
  console.log("IN ADD LIKES")
  console.log(response)
  return response.data
};

export { getBlogs, setToken, createBlog, deleteBlog, addLikes };
