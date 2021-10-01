const notificationReducer = (state = '-', action) => {
  switch (action.type) 
  {
    case 'SET_NOTIFICATION':
    {
      console.log(`action.notification on set ${action.notification}`)
      return action.notification
    }
      case 'DELETE_NOTIFICATION':
      {
        console.log(`action.notification on delete ${action.notification}`)
        return action.notification
      }
    default:
      return state
  }
}

// Action creator for voting anecdote
export const setNotification = content => {
  return {
    type: 'SET_NOTIFICATION',
    notification: content
  }
}

// Action creator for new anecdote
export const deleteNotification = content => {
  return {
    type: 'DELETE_NOTIFICATION',
    notification: content
  }
}

export default notificationReducer