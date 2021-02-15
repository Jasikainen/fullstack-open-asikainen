import axios from 'axios'
const baseUrl = '/api/login'

// service used to request login into back-end
const login = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { login }