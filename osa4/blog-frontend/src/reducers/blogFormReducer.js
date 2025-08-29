const initialState = {
  title: '',
  author: '',
  url: ''
}

const blogFormReducer = (state = initialState, action) => {
  switch (action.type)
  {
  case 'SET_TITLE':
    return { ...state, title: action.payload }
  case 'SET_AUTHOR':
    return { ...state, author: action.payload }
  case 'SET_URL':
    return { ...state, url: action.payload }
  case 'RESET_FORM':
    return initialState
  default:
    return state
  }
}

export const setTitle = (title) => ({
  type: 'SET_TITLE',
  payload: title
})

export const setAuthor = (author) => ({
  type: 'SET_AUTHOR',
  payload: author
})

export const setUrl = (url) => ({
  type: 'SET_URL',
  payload: url
})

export const resetForm = () => ({
  type: 'RESET_FORM'
})

export default blogFormReducer
