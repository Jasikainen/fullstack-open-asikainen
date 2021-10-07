import React from 'react'

const Notification = ({notification}) => {
  const styles = {
    Hidden: {
      hidden: true 
    },
    Visible: {
      hidden: false,
      backgroundColor: '#00ff7f'
    }
  }
  
  return (
    <div style={isEmpty(notification) ? styles.Hidden : styles.Visible}>
      {notification}
    </div>
  )
}

const isEmpty = (text) => {return text === ''}

export default Notification