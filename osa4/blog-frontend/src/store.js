import { configureStore } from '@reduxjs/toolkit'
// Define the reducers for the store
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'
import blogReducer from './reducers/blogReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogform: blogFormReducer,
    blogs: blogReducer
  }
})
console.log(store.getState())

export default store