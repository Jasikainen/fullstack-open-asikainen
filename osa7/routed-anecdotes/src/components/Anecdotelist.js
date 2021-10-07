import React from 'react'
import { Link } from 'react-router-dom'

export const Anecdote = ({ anecdote }) => (
  <div className={'background-anecdote'}>
    <h2>{anecdote.content} by {anecdote.author}</h2>
    <div>
      has {anecdote.votes} votes
    </div>
    <p>
      for more info see <a href={anecdote.info}>{anecdote.info}</a>
    </p>
  </div>
)

export const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      )}
    </ul>
  </div>
)