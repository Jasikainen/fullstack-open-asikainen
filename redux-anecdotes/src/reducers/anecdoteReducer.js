import anecdoteService from '../services/anecdotes'

export const anecdoteReducer = (state = [], action) => {
  switch (action.type) 
  {
    case 'ADD_VOTE':
    {
        const id = action.data.id
        const anecdoteToVote = state.find(a => a.id === id)
        const changedAnecdote = {
          ...anecdoteToVote,
          votes: anecdoteToVote.votes + 1
        }
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote
        )
    }
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}


/*
*** Below is defined action creators ***
*/
export const voteAnecdoteOf = (anecdote) => {
  return async dispatch => {
    // Handle change in back end before dispatching
    const updatedAnecdote = {...anecdote, votes: anecdote.votes + 1}
    const newAnecdote = await anecdoteService.update(updatedAnecdote)
    dispatch({
      type: 'ADD_VOTE',
      data: newAnecdote
    })
  } 
}

export const createAnecdote = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}