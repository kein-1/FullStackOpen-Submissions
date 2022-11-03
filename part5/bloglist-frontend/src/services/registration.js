import axios from "axios";

const registerUrl = "http://localhost:3001/api/registration";
// const registerUrl = "https://4rjbcc-3001.preview.csb.app/api/registration";

const registration = async (userObject) => {
  const response =  await axios.post(registerUrl, userObject);
  return response.data
}

export default registration;
