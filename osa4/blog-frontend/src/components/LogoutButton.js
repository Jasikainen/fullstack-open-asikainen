import React from 'react'


const LogoutButton = ({ setBlogUser, notificationMessageHandler }) => {
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
      setBlogUser(null) // Clear the app state
      notificationMessageHandler(`Logged out. Please come again!`)
    } catch(exception) {
      console.log('Logging out failed', exception)
      notificationMessageHandler(`Logging out did not work for some reason!`, 'error')
    }
  }

  return (
    <button style={logoutStyle} onClick={handleClickLogout} variant="primary" size="lg" >
        Logout
    </button>
  )

}
export default LogoutButton
