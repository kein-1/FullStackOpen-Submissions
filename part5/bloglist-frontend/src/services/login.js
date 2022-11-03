import axios from "axios";

// const loginUrl = "http://localhost:3001/api/login";
const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";

const login = async (credentials) => {
  
  const response = await axios.post(loginUrl, credentials);
  return response.data 
};

export default login;
