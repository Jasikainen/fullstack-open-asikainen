import React from 'react'
import { setTitle as setTitleAction,
  setAuthor as setAuthorAction,
  setUrl as setUrlAction,
  resetForm as resetFormAction } from '../reducers/blogFormReducer'

import { useDispatch, useSelector } from 'react-redux'

const AddBlogForm = ({ addBlog , notificationMessageHandler }) => {
  const inputStyle = {
    fontWeight: '500',
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 2,
    paddingLeft: 2,

  }
  const formMainStyle = {
    border: 'solid',
    borderColor: 'rgba(50, 190, 150, .3)',
    marginBottom: 15,
    width: 300,
    backgroundColor: 'rgba(240, 180, 150, .5)'
  }

  const dispatch = useDispatch()
  // Values defined in reducer
  const { title, author, url } = useSelector((state) => state.blogform)

  const createBlogHandler = async (event) => {
    event.preventDefault()
    try {
      console.log('Blog data before submission:', { title, author, url }) // Debugging
      addBlog({ title, author, url })
      notificationMessageHandler(`A new blog '${title}' by ${author} added`)
      dispatch(resetFormAction())
    } catch (exception) {
      console.log(exception)
      notificationMessageHandler('Could not add blog.', 'error')
    }
  }

  return (
    <form onSubmit={createBlogHandler} style={formMainStyle}>
      <div style={inputStyle}>
          Title:
        <input
          id='blogTitle'
          type="text"
          value={title}
          name="Title"
          onChange={({ target }) => dispatch(setTitleAction(target.value))}
        />
      </div>

      <div style={inputStyle}>
          Author:
        <input
          id='blogAuthor'
          type="text"
          value={author}
          name="Author"
          onChange={({ target }) => dispatch(setAuthorAction(target.value))}
        />
      </div>

      <div style={inputStyle}>
          url:
        <input
          id='blogUrl'
          type="text"
          value={url}
          name="url"
          onChange={({ target }) => dispatch(setUrlAction(target.value))}
        />
      </div>

      <button type="submit">Create blog</button>
    </form>
  )

}

export default AddBlogForm