const initialState = null

const notificationReducer = (state = initialState, action) => {
  switch (action.type)
  {
  case 'SET_NOTIFICATION':
    return action.payload
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

// Action creators
export const setNotification = (message, type = 'info', timeout = 5000) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_NOTIFICATION',
      payload: { message, type }
    })

    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default notificationReducer
