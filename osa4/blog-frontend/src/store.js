import { configureStore } from '@reduxjs/toolkit'
// Define the reducers for the store
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'
import blogReducer from './reducers/blogReducer'
import blogUserReducer from './reducers/blogUserReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogform: blogFormReducer,
    blogs: blogReducer,
    blogUser: blogUserReducer
  }
})
console.log(store.getState())

export default store