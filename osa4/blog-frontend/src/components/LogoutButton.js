import React from 'react'


const Blog = ({ handleClickLogout }) => {
  const logoutStyle = {
    shadowColor: 'black',
    shadowOpacity: 0.8,
    elevation: 6,
    backgroundColor: 'rgba(240, 180, 150, 1)',
    shadowRadius: 15 ,
    shadowOffset : { width: 56, height: 13},
    borderWidth:2,
    borderRadius:0, 
  }

  return (
      <button style={logoutStyle} onClick={handleClickLogout} variant="primary" size="lg" >
        Logout
      </button>
  )

}
export default Blog
