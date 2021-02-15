import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [blogUser, setBlogUser] = useState(null) 

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
      console.log(user.token)
      setBlogUser(user)
      blogService.setUserToken(user.token)
    }
  }, [])

  const loginHandler = async (event) => {
    event.preventDefault()
    console.log(username, password)
    try {
      // returns token and user info of logged-in user
      const userReturned = await loginService.login({
        username, password
      })
      // Set logged in user to browsers local cache
      window.localStorage.setItem(
        'LoggedInBlogUser', JSON.stringify(userReturned)
      ) 

      blogService.setUserToken(userReturned.token)
      setBlogUser(userReturned)
      setUsername(''); setPassword('');
      
    } catch (exception) {
      console.log('Wrong login credentials.', exception)
    }
  }

  const handleClickLogout = async (event) => {
    event.preventDefault()
    console.log('Logging out of the blog application')
    try {
      window.localStorage.removeItem('LoggedInBlogUser')
    } catch(exception) {
      console.log('Logging out failed', exception) 
    }
  }

  return (
    <div>
      {blogUser === null ?
        <LoginForm
        loginHandler={loginHandler}
        setUsername={setUsername}
        setPassword={setPassword}
        username={username}
        password={password}
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
            <LogoutButton handleClickLogout={handleClickLogout} />
          </p>

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