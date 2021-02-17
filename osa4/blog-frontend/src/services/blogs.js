import axios from 'axios'
const baseUrl = '/api/blogs'

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

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const updateBlog = async (newObject, id) => {
  console.log("newObject", newObject)
  const response = await axios.put(`${baseUrl}/${id}`, newObject)
  console.log("response", response)
  return response.data
}


export default { getAll, create, setUserToken, updateBlog }