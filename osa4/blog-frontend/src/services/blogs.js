import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
const setUserToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log('Creating a new blog with the following data:', newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject, id) => {
  const requestUrl = `${baseUrl}/${id}`
  console.log('Updated existing object:', newObject)
  const response = await axios.put(requestUrl, newObject)

  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }
  const requestUrl = `${baseUrl}/${id}`
  
  const response = await axios.delete(requestUrl, config)
  return response.data
}

export default { getAll, create, setUserToken, update, remove }