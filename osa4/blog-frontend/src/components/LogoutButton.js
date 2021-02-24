import React from 'react'


const LogoutButton = () => {
  const logoutStyle = {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: 'rgba(240, 180, 150, 1)',
    shadowRadius: 15 ,
    shadowOffset : { width: 56, height: 13 },
    borderWidth:2,
    borderRadius:0,
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
    <button style={logoutStyle} onClick={handleClickLogout} variant="primary" size="lg" >
        Logout
    </button>
  )

}
export default LogoutButton
