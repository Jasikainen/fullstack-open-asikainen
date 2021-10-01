const filterReducer = (state = '', action) => {
  console.log('action', action)
  switch (action.type) 
  {
    case 'SET_FILTER':
    {
      return action.filter
    }
    case 'RESET_FILTER':
    {
      return action.filter
    }
    default:
      return state
  }
}

export const setFilter = filter => {
  return {
    type   : 'SET_FILTER', 
    filter : filter
  }
}

export const resetFilter = () => {
  return {
    type   : 'RESET_FILTER',
    filter : ''
  }
}

export default filterReducer