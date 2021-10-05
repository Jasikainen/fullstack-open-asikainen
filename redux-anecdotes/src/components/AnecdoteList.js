import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdoteOf } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'


// Refactor single anecdote to it's own component outside AnecdoteList
const Anecdote = ({anecdote, notification}) => {
  const dispatch = useDispatch()
  
  const voteHandler = (anecdote, notification) => {
    console.log(`notification.formerTimeOutId '${notification.formerTimeOutId}'`);
    dispatch(voteAnecdoteOf(anecdote))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5, notification.formerTimeOutId))
  }

  return (
    <li>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => voteHandler(anecdote, notification)}>vote</button>
      </div>
    </li>
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
  const notification = useSelector((state) => state.notification)
  // Components (child) need to have keys defined
  return ( 
    <ul>
      {anecdotes.map(anecdote => <Anecdote key={anecdote.id} anecdote={anecdote} notification={notification} /> )}
   </ul>
  )
}

// Export the component for representing list of anecdotes
export default AnecdoteList
