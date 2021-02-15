import React, { useState, useEffect } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [blogUser, setBlogUser] = useState(null) 
  const [errorMessage, setErrorMessage] = useState(null)
  
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  // Used to check from local cache if user logged in session
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('LoggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      console.log(user)
      setBlogUser(user)
      blogService.setUserToken(user.token)
    }
  }, [])
  
  const notificationMessageHandler = (message, type='success') => {
    setErrorMessage({ message, type })
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
    

  return (
    <div>
      <Notification message={errorMessage} />
      {blogUser === null ?
        <LoginForm
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
        loginService={loginService}
        blogService={blogService}
        setBlogUser={setBlogUser}
        notificationMessageHandler={notificationMessageHandler}
        /> :
        <div>
          <h2 style={{
            fontSize: 25,
            borderStyle: "solid",
            borderWidth: 1,
            backgroundColor: 'rgba(240, 180, 150, 1)'
          }}>
            Blog posts
          </h2>

          <p>
            {blogUser.name !== null ?
            blogUser.name : 
            blogUser.username} logged in {" "}
            <LogoutButton />
          </p>

          <AddBlogForm 
          blogs={blogs}
          setBlogs={setBlogs}
          blogUser={blogUser}
          blogService={blogService}
          notificationMessageHandler={notificationMessageHandler}
          />

          {blogs.map(blog => 
            blog.user && 
            blogUser.username && 
            blog.user.username.toString() === blogUser.username.toString() &&
            <Blog key={blog.id} blog={blog} blogUser={blogUser} />
          )}
        </div>
      }
    </div>
  )
}

export default App