import React, { useState } from 'react'


const Blog = ({ blog, addLike }) => {
  const titleStyle = {
    fontWeight: "350",
    fontSize: 15,
    border: "solid",
    borderWidth: 1,
    paddingBottom: 5,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: 'rgba(240, 180, 150, .5)'
  }

  const [viewInfo, setViewInfo] = useState(false)
  const hideWhenVisible = { display: viewInfo ? 'none' : '' }
  const showWhenVisible = { 
    display: viewInfo ? '' : 'none',
    fontWeight: "500",
    border: "solid",
    borderColor: 'rgba(0, 0, 0, .5)',
    backgroundColor: 'rgba(240, 180, 150, .6)',
    width: 300,
    padding: 5
    }
  const toggleVisibility = () => {
    setViewInfo(!viewInfo)
  }

  // Set like button green for a while after is added without exceptions thrown
  const [color, setColor] = useState(false)
  const showColor = { 
    color: color ? 'green' : '',
    border: color ? 'solid' : null,
  }
  const increaseLikes = () => {
    try {
      const blogId = blog.id
      const blogObject = {
        user: blog.user.id,
        likes: blog.likes + 1,
        title: blog.title,
        author: blog.author,
        url: blog.url,
      }
      addLike(blogObject, blogId)
      setColor(true)
      setTimeout(() => {setColor(false)}, 100)
    } catch (exception) {
      console.log("exception was in increaseLikes", exception)
    }
  }

  // Blogs have button to display/hide information about them
  return (
    <div style={titleStyle}>

      <div style={hideWhenVisible}>
        {blog.title} {" - "} {blog.author} <button onClick={toggleVisibility}>View information</button>
      </div>

      <div style={showWhenVisible}>
          <button onClick={toggleVisibility}>Hide information</button>
          <div>Title: {blog.title}</div>
          <div>Url: {blog.url}</div>
          <div>
            likes: {blog.likes} <button style={showColor} onClick={increaseLikes}>Like</button>
          </div>
          <div>Author: {blog.author}</div>
          <div>Id: {blog.id}</div>
      </div>

  </div>
  )
}

export default Blog
