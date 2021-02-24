import React from 'react'


const loginForm = ({
  setUsername,
  setPassword,
  username, password,
  loginService, blogService,
  setBlogUser,
  notificationMessageHandler
}) => {
  const loginFormStyle = {
    color: 'green',
    background: 'lightgrey',
    fontSize: 15,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    marginBottom: 5,
    width: 200,
  }

  const loginHandler = async (event) => {
    event.preventDefault()
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
      setUsername('')
      setPassword('')

    } catch (exception) {
      notificationMessageHandler('Wrong username or password', 'error')
    }
  }

  return (
    <div style={{ paddingLeft: 10 }}>
      <h1 style={{ fontSize: 20 }}>Log in to application</h1>

      <form onSubmit={loginHandler}>
        <div style={loginFormStyle}>
          Username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div style={loginFormStyle}>
          Password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-btn" type="submit">login</button>
      </form>
    </div>
  )
}

export default loginForm