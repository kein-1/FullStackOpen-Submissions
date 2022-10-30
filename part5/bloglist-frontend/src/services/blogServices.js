import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  // console.log(`Token now is: ${token}`);
};

const getBlogs = async (url) => {
  const item = await axios.get(url);
  return item.data;
};

const createBlog = async (url, obj) => {
  //This is passsed as an object to the 3rd parameter of axios.post.
  //Third parameter is how we want to pass stuff like headers
  const config = {
    headers: { Authorization: token },
  };
  //This is very interesting. Took me a long time to wrap my head around but:
  //How does axios know whether the post was sucecssful or not? Using await here means we are waiting for the POST request to complete. It turns out by default, axios throws an error anytime the server generates a status code of 4XX or 5XX
  //Notice that the code after the post request will NOT run if there is an error here because axios throws an error. So even if we export this to be used in our main app, we can still catch errors there with a try/catch block becasue axios will throw an error. Then await will detect an error and generate an exception, stopping the rest of the code and jumping straight to the catch block
  console.log("Backend run");
  
  const newBlog = await axios.post(url, obj, config);
  console.log(newBlog);
  return newBlog.data
};

const deleteBlog = async (url) => {
  const config = {
    headers: { Authorization: token },
  };
  console.log(url);
  const response = await axios.delete(url,config);
  console.log(response)
  return response
};

export { getBlogs, setToken, createBlog, deleteBlog };
