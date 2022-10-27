import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
  console.log(`Token now is: ${token}`);
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
  const newBlog = await axios.post(url, obj, config);
  console.log("Backend");
  console.log(newBlog);
  return newBlog.data;
};

const deleteBlog = async (url) => {
  console.log(url);
  // const response = await axios.delete(url);
  // return response.data;
};

export { getBlogs, setToken, createBlog, deleteBlog };
