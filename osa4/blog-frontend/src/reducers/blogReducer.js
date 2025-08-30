const initialState = []

// Define the reducer for Blog react component to use
const blogReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'INITIALIZE_BLOGS':
    return action.payload
  case 'ADD_BLOG':
    {
      console.log('Adding new blog to state:', state) // Debugging
      return [...state, action.payload]
    }
  case 'LIKE_BLOG': {
  const updatedBlog = action.payload
  const newState = state.map(blog =>
    blog.id !== updatedBlog.id ? blog : updatedBlog
  )
  // Sort after update
  return newState.sort((a, b) => b.likes - a.likes)
}
  default:
      return state
  }
}

export const initializeBlogs = (blogs) => ({
  type: 'INITIALIZE_BLOGS',
  payload: blogs
})

export const addBlog = (blog) => ({
  type: 'ADD_BLOG',
  payload: blog
})

export const likeBlog = (updatedBlog) => ({
  type: 'LIKE_BLOG',
  payload: updatedBlog
})

export default blogReducer