import axios from 'axios'
const baseUrl = "http://localhost:3001/persons"


export const getAll = () => {
    return axios.get(baseUrl)
}

export const createPerson = (newPersonObject) => {
    return axios.post(baseUrl, newPersonObject)
}

export const deletePerson = (name,id) => {
    if (window.confirm(`Delete ${name}`)){

        return axios.delete(`${baseUrl}/${id}`)
    }
}

export const changeNumber = (newPersonObject,id) => {
    return axios.put(`${baseUrl}/${id}`, newPersonObject)
} 