import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [blogUser, setBlogUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  const sortBlogsByLikes = (blogPosts) => {
    return blogPosts.sort((first, second) => second.likes-first.likes)
  }

  // Get all blogs from database trough back-end
  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs( sortBlogsByLikes(blogs) )
    })
  }, [])

  // Used to check from local cache if user logged in session
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log('LoggedInBlogUser',user)
      setBlogUser(user)
      blogService.setUserToken(user.token)
    }
  }, [])
  
  // Set message to Notification component thats passed by
  const notificationMessageHandler = (message, type='success') => {
    setErrorMessage({ message, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
    
  // POST: Request back-end to add new blog
  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returneBlog=> {
        setBlogs(blogs.concat(returneBlog))
      })
  }

  // PUT: Request back-end to update blogpost
  const addLike = (blogObject, id) => {
    blogService
      .updateBlog(blogObject, id)
      .then(returneBlog=> {
        // Update blogs after the request is fulfilled
        blogService
        .getAll()
        .then(blogs => setBlogs( sortBlogsByLikes(blogs) ))
      })
  }

  // Render the LoginForm component in App
  const displayLoginForm = () => (
    <Togglable buttonLabel='login'>
      <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
        loginService={loginService}
        blogService={blogService}
        setBlogUser={setBlogUser}
        notificationMessageHandler={notificationMessageHandler}
      />
    </Togglable>
  )

  // Render the AddBlogForm component in App
  const displayAddBlogForm = () => (
    <Togglable buttonLabel='Create' ref={blogFormRef}>
      <h3>Create a new blog post with needed information</h3>
      <AddBlogForm 
        addBlog={addBlog}
        notificationMessageHandler={notificationMessageHandler}
      />
    </Togglable>
  )

  // Render the Logout-<button> component in App
  const displayLogout = () => (
    <div>
      {blogUser.username} logged in {" "}
      <LogoutButton />
    </div>
  )

  // Rendering the App
  return (
    <div>
      <Notification message={errorMessage} />

      {blogUser === null ?
      <div>
        <h3>Welcome to use the blog application</h3> 
        {displayLoginForm()}
      </div> :
      
        <div>
          <h2 className='BlogPost'>
            Blog posts
          </h2>

          {blogUser.name !== null && displayLogout()}

          {displayAddBlogForm()}

          {blogs.map(blog => 
            blog.user && 
            blogUser.username && 
            blog.user.username.toString() === blogUser.username.toString() &&
            <Blog key={blog.id} blog={blog} blogUser={blogUser} addLike={addLike} />
          )}
        </div>
      }
    </div>
  )
}

export default App