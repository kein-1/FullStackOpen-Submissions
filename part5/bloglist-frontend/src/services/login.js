import axios from "axios";

const loginUrl = "http://localhost:3001/api/login";
// const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";

const login = async (credentials) => {
  try{
    const response = await axios.post(loginUrl, credentials);
    console.log("good login!")
    return response.data 
  } catch (error) {
    console.log("Error")
    console.log(error)
    return Promise.reject()
  }
  
};

export default login;
