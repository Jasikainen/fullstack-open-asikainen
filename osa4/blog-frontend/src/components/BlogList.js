import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import Togglable from './Togglable'

import { likeBlog, initializeBlogs } from '../reducers/blogReducer'
import blogService from '../services/blogs'

const BlogList = ({ removeBlog, addLike }) => {
  const blogs = useSelector(state => state.blogs)
  const blogUser = useSelector(state => state.blogUser)
  const blogListRef = useRef()

  // Sort blogs by likes
  const sortBlogsByLikes = (blogPosts) => {
    return [...blogPosts].sort((first, second) => second.likes - first.likes)
  }

  const filteredBlogs = blogs
    .filter(blog =>
      blog.user &&
      blog.user.username &&
      blogUser &&
      blogUser.username &&
      blog.user.username.toString() === blogUser.username.toString()
    )
  
  const sortedBlogs = sortBlogsByLikes(filteredBlogs)
  
  return (
    <div style={{ marginTop: '20px' }}>
      <Togglable buttonLabel='Show blogs' ref={blogListRef}>
        <h3>Your blogs </h3>
        {sortedBlogs.length === 0 ? (
          <p>No blogs found. Create your first blog post!</p>
        ) : (
          sortedBlogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              addLike={addLike}
              removeBlog={removeBlog}
            />
          )
        )}
      </Togglable>
    </div>
  )
}

export default BlogList