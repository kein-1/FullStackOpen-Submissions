import axios from "axios";

const blogsUrl = "http://localhost:3001/api/blogs";
// const blogsUrl = "https://4rjbcc-3001.preview.csb.app/api/blogs";

//THIS IS NOT THE RIGHT WAY OF DOING IT. I SHOULD SETUP A PRODUCTION AND DEVELOPMENT
//ENVIRONMENTAL VARIABLES AND IT WILL RUN SEPARATE URLS BASED ON WHETHER OUR CODE IS
//IN PRODUCTION OR DEVELOPMENT!!! LOOK INTO THIS !!
//I WAS RUNNING INTO ERRORS WHEN I HOSTED BY SITE WITHOUT DOING THIS!!!
// const blogsUrl = "https://blog-backend-9a3n.onrender.com/api/blogs";

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
  const newBlog = await axios.post(blogsUrl, obj, config);
  console.log("Will run if no error");
  console.log(newBlog);
  return newBlog.data;
};

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${blogsUrl}/${id}`, config);
  console.log(response);
  return response;
};

const addLikes = async (id, data) => {
  const config = {
    headers: { Authorization: token },
  };

  //Axios adds the data we want to PUT inside the "body" field of the request object.
  //We can access this object using reuqest.body in the backend, just like a POSt request

  const response = await axios.put(`${blogsUrl}/${id}`, data, config);
  console.log("IN ADD LIKES");
  console.log(response);
  return response.data;
};

export { getBlogs, setToken, createBlog, deleteBlog, addLikes };

/*

Why don't we use trycatch here? Because an error inside an async function will return a promise that is rejected. So if axios returns an error, which is wrapped in a promise, we can await that promise
This will then throw an error inside oru function
any error inside an async function will cause that promise to reject 





*/
