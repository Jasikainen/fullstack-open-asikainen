require('dotenv').config()

let PORT = process.env.PORT
let MONGODB_URI = process.env.MONGODB_URI
let REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL

if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.TEST_MONGODB_URI
}

module.exports = {
  MONGODB_URI,
  PORT,
  REACT_APP_BACKEND_URL
}
