

const notificationReducer = (state = null, action) => {
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

export const setNotification = content => {
  return {
    type         : 'SET_NOTIFICATION',
    notification : content
  }
}

export const deleteNotification = () => {
  return {
    type         : 'DELETE_NOTIFICATION',
    notification : null
  }
}

export default notificationReducer