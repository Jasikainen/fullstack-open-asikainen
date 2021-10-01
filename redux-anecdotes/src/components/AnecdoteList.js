import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'
import { setNotification, deleteNotification } from '../reducers/notificationReducer'

// Refactor single anecdote to it's own component outside AnecdoteList
const Anecdote = ({anecdote}) => {
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdoteOf(id))
    dispatch(setNotification(`You voted '${content}'`))
    setTimeout(() => { dispatch(deleteNotification()) }, 5000)
  }

  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
      </div>
    </div>
  )
}

// List component
const AnecdoteList = (props) => {
  // Get multiple reducer states from store
  const anecdotes = useSelector(({filter, anecdotes}) => {
    // Sort anecdotes here in descending order
    var sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)
    
    if (!filter)
      return sortedAnecdotes
    else
    {
      // Flag "i" tells that the regex filter is not case sensitive
      const regex = new RegExp(filter, 'i')
      const filteredAnecdotes = sortedAnecdotes.filter(a => a.content.match(regex))
      return filteredAnecdotes
    }
  })

  return ( 
    anecdotes.map(anecdote =>
      <Anecdote key={anecdote.id} anecdote={anecdote }/>
    ) 
  )
}

// Export the component for representing list of anecdotes
export default AnecdoteList
