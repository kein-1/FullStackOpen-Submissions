import axios from "axios";

// const loginUrl = 'http://localhost:3001/api/login'
const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";

const login = async (credentials) => {
  try{
    return await axios.post(loginUrl, credentials);
  } catch(error) {
    console.log("Backend error in logging in")
    console.log(error)
    return error.response
  }
};

export default login;
