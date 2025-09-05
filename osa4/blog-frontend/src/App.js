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
import BlogList from './components/BlogList'

// Import the needed reducers
import { setNotification as setNotificationAction } from './reducers/notificationReducer'
import { initializeBlogs as initializeBlogsAction,
  addBlog as addBlogAction,
  likeBlog as likeBlogAction } from './reducers/blogReducer'
import { setBlogUser as setBlogUserAction } from './reducers/blogUserReducer'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const dispatch = useDispatch()

  //const [blogs, setBlogs] = useState([]) changed in assignment 7.11 to use blogReducer
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [blogUser, setBlogUser] = useState(null) changed in assignment 7.13 to use reducer
  const blogUser = useSelector(state => state.blogUser)
  //const [errorMessage, setErrorMessage] = useState(null) changed in assigment 7.10 to use notificationReducer
  const notificationErrorMessage = useSelector(state => state.notification)

  const blogFormRef = useRef()

  const sortBlogsByLikes = (blogPosts) => {
    return blogPosts.sort((first, second) => second.likes-first.likes)
  }

  // Get all blogs from database trough back-end
  // Updated to dispatch the initializeBlogs redux action creator in assignment 7.11
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sortedBlogs = sortBlogsByLikes(blogs)
      dispatch(initializeBlogsAction(sortedBlogs))
    })
  }, [dispatch])

  // Used to check from local cache if user logged in session
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogUser')
    console.log("Logged user JSON", loggedUserJSON)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log("User from JSON", user)
      dispatch(setBlogUserAction(user))
      blogService.setUserToken(user.token)
    }
  }, [dispatch])

  // In 7.10 changed to use dispatch
  const notificationMessageHandler = (message, type = 'success') => {
    dispatch(setNotificationAction(message, type, 5000))  // Automatically clears after 5s
  }


  // POST: Request back-end to add new blog
  const addBlog = (blogObject) => {
    console.log('Blog object received in addBlog:', blogObject)
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        dispatch(addBlogAction(returnedBlog))
      })
      .catch(error => {
        notificationMessageHandler(`Error adding blog (status: ${error.response?.status || 'unknown'})`, 'error')
      })
  }

  // PUT: Request back-end to update blogpost
  const addLike = (blogObject, id) => {
    blogService
      .update(blogObject, id)
      .then(returnedBlog => {
        console.log('Blog liked:', returnedBlog)
        dispatch(likeBlogAction(returnedBlog))
        // Update blogs after the request is fulfilled
        blogService
          .getAll()
          .then(blogs => {
            console.log('All blogs to dispatch:', blogs)
            const sortedBlogs = sortBlogsByLikes(blogs)
            dispatch(initializeBlogsAction(sortedBlogs))
          })
      })
  }

  // DELETE: Request to back-end to delete blogpost
  const removeBlog = (blogObject, id) => {
    if (window.confirm(`Remove '${blogObject.title}' by '${blogObject.author}'?`)) {
      blogService
        .remove(id)
        .then(returnedBlog => {
          notificationMessageHandler('Removed succesfully')
          // Update blogs after the request is fulfilled
          blogService
            .getAll()
            .then(blogs => {
              const sortedBlogs = sortBlogsByLikes(blogs)
              dispatch(initializeBlogsAction(sortedBlogs))
            })
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
    <div>
      <p>Login to access your blogs</p>
      <Togglable buttonLabel='login'>
        <LoginForm
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          loginService={loginService}
          blogService={blogService}
          notificationMessageHandler={notificationMessageHandler}
        />
      </Togglable>
    </div>
  )

  // Render the AddBlogForm component in App
  const displayAddBlogForm = () => (
    <div style={{ marginTop: '20px', marginBottom: '5px' }}>
      <Togglable buttonLabel='Create' ref={blogFormRef}>
        <h3>Create a new blog post with needed information</h3>
        <AddBlogForm
          addBlog={addBlog}
          notificationMessageHandler={notificationMessageHandler}
        />
      </Togglable>
    </div>
  )

  // Render the Logout-<button> component in App
  const displayLogout = () => (
    <div style={{ 
      padding: '2px',
      marginTop: '5px',
      marginBottom: '3px',
      backgroundColor: 'rgba(240, 180, 150, 0.16)',
      borderRadius: '5px'
    }}>
      {blogUser && blogUser.username ? (
        <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
          Logged in as {blogUser.username}
        </div>
      ) : ''}
      <LogoutButton notificationMessageHandler={notificationMessageHandler}/>
    </div>
  )


  // Rendering the App
  return (
    <div>
      <Notification message={notificationErrorMessage} />
      {
        !blogUser || blogUser === null
          ?
          <div>
            <h3>Welcome to use the blog application</h3>
            {displayLoginForm()}
          </div>
          :
          <div>
            <h2 className='BlogPost'>Blog posts</h2>
            {displayAddBlogForm()}
            {<BlogList removeBlog={removeBlog} addLike={addLike} />}
            {blogUser && blogUser.name !== null && displayLogout()}
          </div>
      }
    </div>
  )
}

export default App