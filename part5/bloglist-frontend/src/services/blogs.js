import axios from "axios";

const getBlogs = async () => {
  const item = await axios.get("http://localhost:3001/api/blogs");
  return item.data;
};

export default getBlogs