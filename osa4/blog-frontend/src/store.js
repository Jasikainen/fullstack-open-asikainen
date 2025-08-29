import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogFormReducer from './reducers/blogFormReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogform: blogFormReducer
  }
})
console.log(store.getState())

export default store