import React from 'react'


const Blog = ({ blog, blogUser }) => {
  const titleStyle = {
    fontWeight: "500",
    fontSize: 15,
    border: "solid",
    borderWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 5,
    backgroundColor: 'rgba(240, 180, 150, .5)'
  }

  return (
    <div style={titleStyle}>
      {blog.title} {" - "} {blog.author}
    </div>
  )

}
export default Blog
