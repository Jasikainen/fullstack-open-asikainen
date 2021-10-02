import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


const NewAnecdote = (props) => {
  const dispatch = useDispatch()
  
  // Defined as async because of backend call
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
  
    // dispatch to notificationReducer action creators
    dispatch(setNotification(`New anecdote: '${content}'`, 5000))
  }

  return (
    <div>
      <h2>create new</h2>
        <form onSubmit={addAnecdote}>
          <div>
            <input name="anecdote"/>
          </div>
          <button type="submit">create</button>
        </form>
  </div>
  )
}

// Export the component for generating new anecdote with non-controlled form
export default NewAnecdote