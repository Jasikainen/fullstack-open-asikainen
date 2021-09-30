import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdoteOf } from '../reducers/anecdoteReducer'

// List component
const AnecdoteList = (props) => {
  const anecdotes = useSelector(state => {
    // Sort anecdotes here in descending order
    const sortedAnecdotes = state.sort((a, b) => b.votes - a.votes)
    return sortedAnecdotes
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteAnecdoteOf(id))
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
  </div>
  )
}

// Export the component for representing list of anecdotes
export default AnecdoteList
