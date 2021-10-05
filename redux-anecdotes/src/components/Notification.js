
import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const styles = {
    Empty:
    {
      display: 'none'
    },
    Content:
    {
      border: 'solid',
      padding: 10,
      borderWidth: 2,
      backgroundColor: "#7cfc00"
    }
  }

  return (
    <div style={props.notification.content  === null ? styles.Empty : styles.Content}>
      {props.notification.content}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification
  } 
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification