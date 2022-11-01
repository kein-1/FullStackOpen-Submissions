import axios from "axios";

const registerUrl = "http://localhost:3001/api/registration";
// const registerUrl = "https://4rjbcc-3001.preview.csb.app/api/registration";

const registration = async (userObject) => {
  try {
    return await axios.post(registerUrl, userObject);
  } catch (error) {
    console.log("Backend error in registration");
    console.log(error);
    return error.response;
  }
};

export default registration;
