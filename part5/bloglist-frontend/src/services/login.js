import axios from 'axios'

const login = async (url, credentials) => {
    const response = await axios.post(url, credentials)
    return response.data
} 

export default login