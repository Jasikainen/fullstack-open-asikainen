
import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  const styles = {
    Empty:
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    },
    Content:
    {
      border: 'solid',
      padding: 10,
      borderWidth: 2,
      backgroundColor: "	#7cfc00"
    }
  }

  return (
    <div style={notification  === '-' ? styles.Empty : styles.Content}>
      {notification}
    </div>
  )
}

export default Notification