const initialState = null

// Alternative if you prefer an object with null properties:
// const initialState = {
//   id: null,
//   username: null,
//   name: null,
//   token: null,
//   blogs: []
// }

const blogUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BLOG_USER':
      return action.payload
    case 'CLEAR_BLOG_USER':
      return initialState
    default:
      return state
  }
}

export const setBlogUser = (user) => {
  return {
    type: 'SET_BLOG_USER',
    payload: user
  }
}

export const clearBlogUser = () => {
  return {
    type: 'CLEAR_BLOG_USER'
  }
}

export default blogUserReducer