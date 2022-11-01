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
