import axios from "axios";

const registerUrl = "http://localhost:3001/api/registration";
// const registerUrl = "https://4rjbcc-3001.preview.csb.app/api/registration";

//THIS IS NOT THE RIGHT WAY OF DOING IT. I SHOULD SETUP A PRODUCTION AND DEVELOPMENT
//ENVIRONMENTAL VARIABLES AND IT WILL RUN SEPARATE URLS BASED ON WHETHER OUR CODE IS
//IN PRODUCTION OR DEVELOPMENT!!! LOOK INTO THIS !!
//I WAS RUNNING INTO ERRORS WHEN I HOSTED BY SITE WITHOUT DOING THIS!!!
// const registerUrl = "https://blog-backend-9a3n.onrender.com/api/registration";

const registration = async (userObject) => {
  const response = await axios.post(registerUrl, userObject);
  return response.data;
};

export default registration;
