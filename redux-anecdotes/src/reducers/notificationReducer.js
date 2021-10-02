

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

export const setNotification = (content, displayForSeconds) => {
  return async dispatch => {
    dispatch({
      type         : 'SET_NOTIFICATION',
      notification : content
    })
    // Could be done with straight dispatch to reducer from here...
    setTimeout(() => { dispatch(deleteNotification()) }, displayForSeconds*1000)
  }
}

export const deleteNotification = () => {
  return {
    type         : 'DELETE_NOTIFICATION',
    notification : null
  }
}

export default notificationReducer