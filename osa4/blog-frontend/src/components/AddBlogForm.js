import React, { useState } from 'react'

const AddBlogForm = ({ blogs, setBlogs, blogUser, blogService, notificationMessageHandler }) => {
  const inputStyle = {
    fontWeight: "500",
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 2,
    paddingLeft: 2,
    
  }
  const formMainStyle = {
    border: "solid",
    borderColor: 'rgba(50, 190, 150, .3)',
    padding: 5,
    marginBottom: 15,
    width: 300,
    backgroundColor: 'rgba(240, 180, 150, .5)'
  }


  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlogHandler = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: blogTitle,
        author: blogAuthor,
        url: blogUrl,
      }
      const blog = await blogService.create(blogObject)
      setBlogs(blogs.concat(blog))
      notificationMessageHandler(`a new blog '${blog.title}' by ${blog.author} added`)

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
    } catch (exception) {
      notificationMessageHandler('Could not add blog.', 'error')
    }
  }

  return (
    <form onSubmit={addBlogHandler} style={formMainStyle}>
        <div style={inputStyle}>
          Title:
            <input
            type="text"
            value={blogTitle}
            name="Title"
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>

        <div style={inputStyle}>
          Author:
            <input
            type="text"
            value={blogAuthor}
            name="Author"
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>

        <div style={inputStyle}>
          url:
            <input
            type="text"
            value={blogUrl}
            name="url"
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>

        <button type="submit">Create blog</button>
      </form> 
  )

}
export default AddBlogForm
