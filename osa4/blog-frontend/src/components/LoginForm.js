import React from 'react'
const loginForm = ({
  loginHandler,
  setUsername,
  setPassword,
  username,
  password
}) => {

  const loginFormStyle = { 
    color: "green",
    background: "lightgrey",
    fontSize: 15,
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 2,
    padding: 5,
    marginBottom: 5,
    width: 200,
}

  return (
    <div style={{paddingLeft: 10}}>
      <h1 style={{fontSize: 20}}>Log in to application</h1>
  
      <form onSubmit={loginHandler}>
        <div style={loginFormStyle}>
          Username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>

        <div style={loginFormStyle}>
          Password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form> 
  </div>  
  )
}
export default loginForm