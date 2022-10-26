import axios from 'axios'


const login = async (url, credentials) => {

    const response = await axios.post(url, credentials)
    console("after login")
    console(response.data)
    return response.data

} 

export default login