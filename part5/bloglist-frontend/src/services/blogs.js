import axios from "axios";

const getBlogs = async (url) => {
  const item = await axios.get(url);
  return item.data;
};

export default getBlogs