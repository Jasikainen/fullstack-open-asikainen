/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './App.css'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import { setNotification } from './reducers/notificationReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [blogUser, setBlogUser] = useState(null)
  //const [errorMessage, setErrorMessage] = useState(null) changed in assigment 7.10 to use notificationReducer
  const notificationErrorMessage = useSelector(state => state.notification)
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
      setBlogUser(user)
      blogService.setUserToken(user.token)
    }
  }, [])

  // In 7.10 changed to use dispatch
  const notificationMessageHandler = (message, type = 'success') => {
    dispatch(setNotification(message, type, 5000))  // Automatically clears after 5s
  }


  // POST: Request back-end to add new blog
  const addBlog = (blogObject) => {
    console.log('Blog object received in addBlog:', blogObject)
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returneBlog => {
        setBlogs(blogs.concat(returneBlog))
      })
      .catch(error => {
        notificationMessageHandler(`Error adding blog (status: ${error.response?.status || 'unknown'})`, 'error')
      })
  }

  // PUT: Request back-end to update blogpost
  const addLike = (blogObject, id) => {
    blogService
      .update(blogObject, id)
      .then(returneBlog => {
        // Update blogs after the request is fulfilled
        blogService
          .getAll()
          .then(blogs => setBlogs( sortBlogsByLikes(blogs) ))
      })
  }

  // DELETE: Request to back-end to delete blogpost
  const removeBlog = (blogObject, id) => {
    if (window.confirm(`Remove '${blogObject.title}' by '${blogObject.author}'?`)){
      blogService
        .remove(id)
        .then(returnedBlog => {
          notificationMessageHandler('Removed succesfully')
          // Update blogs after the request is fulfilled
          blogService
            .getAll()
            .then(blogs => setBlogs( sortBlogsByLikes(blogs) ))
        })
        .catch(error => {
          if (error.status === 401) {
            notificationMessageHandler('401 error', 'error')
          }
        })
    }
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

  // Render the displayBlogs component in App
  // Blog posts are only shown to the currently logged in user
  const displayBlogs = () => (
    blogs.map(blog =>
      blog.user &&
      blogUser.username &&
      blog.user.username.toString() === blogUser.username.toString() &&
      <Blog key={blog.id} blog={blog} blogUser={blogUser} addLike={addLike} removeBlog={removeBlog}/>
    )
  )

  // Render the Logout-<button> component in App
  const displayLogout = () => (
    <div>
      {blogUser.username} ({blogUser.name}) logged in {' '}
      <LogoutButton 
      setBlogUser={setBlogUser} notificationMessageHandler={notificationMessageHandler}/>
    </div>
  )


  // Rendering the App
  return (
    <div>
      <Notification message={notificationErrorMessage} />
      {
        blogUser === null
          ?
          <div>
            <h3>Welcome to use the blog application</h3>
            {displayLoginForm()}
          </div>
          :
          <div>
            <h2 className='BlogPost'>Blog posts</h2>
            {blogUser.name !== null && displayLogout()}
            {displayAddBlogForm()}
            {displayBlogs()}
          </div>
      }
    </div>
  )
}

export default App