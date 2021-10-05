

export const notificationReducer = (state = {content: null, formerTimeOutId: null}, action) => {
  switch (action.type) 
  {
    case 'SET':
    {
      return action.data
    }
    case 'DELETE':
    {
      return action.data
    }
    default:
      return state
  }
}

export const setNotification = (content, dispTime, timeOutIdToClear) => {
  return async dispatch => {
    const millis = dispTime * 1000;
    // Used to clear previous call to setTimeOut function
    let timeOutId = setTimeout(() => 
        { dispatch(deleteNotification()) },
        millis)
    // Store current timeOutId to store    
    dispatch({
      type: 'SET',
      data:
      { 
        content: content, 
        formerTimeOutId: timeOutId 
      }
    })

    // Each call has to store their timeOutId to store but the previous
    // time out will be cleared with the one passed to this action creator
    clearTimeout(timeOutIdToClear)
  }
}

export const deleteNotification = () => {
  return {
    type: 'DELETE',
    data: { content : null }
  }
}

