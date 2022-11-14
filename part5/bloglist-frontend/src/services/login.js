import axios from "axios";

// const loginUrl = "http://localhost:3001/api/login";
// const loginUrl = "https://4rjbcc-3001.preview.csb.app/api/login";

//THIS IS NOT THE RIGHT WAY OF DOING IT. I SHOULD SETUP A PRODUCTION AND DEVELOPMENT
//ENVIRONMENTAL VARIABLES AND IT WILL RUN SEPARATE URLS BASED ON WHETHER OUR CODE IS
//IN PRODUCTION OR DEVELOPMENT!!! LOOK INTO THIS !!
//I WAS RUNNING INTO ERRORS WHEN I HOSTED BY SITE WITHOUT DOING THIS!!!
const loginUrl = "https://blog-backend-walv.onrender.com/api/login";

const login = async (credentials) => {
  try {
    const response = await axios.post(loginUrl, credentials);
    console.log("good login!");
    return response.data;
  } catch (error) {
    console.log("Error");
    console.log(error);
    return Promise.reject();
  }
};

export default login;
