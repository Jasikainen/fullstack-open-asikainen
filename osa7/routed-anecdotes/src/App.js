import React, { useState } from 'react'
import {
  Switch, Route, useRouteMatch
} from "react-router-dom"

import './App.css';

import Menu from './components/Menu.js'
import {Anecdote, AnecdoteList} from './components/Anecdotelist.js'
import About from './components/About.js'
import Footer from './components/Footer.js'
import CreateNew from './components/CreateNew.js'
import Notification from './components/Notification.js'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  anecdotes.forEach(a=>console.log(`anecdote info: ${a.info}`))

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote: ${anecdote.content} created`)
    setTimeout(() => { setNotification('') }, 10000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)
    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match ? anecdoteById(match.params.id) : null

  return (
    <div>
      <div><h1>Software anecdotes</h1></div>
      <Menu />

      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} />
        </Route>

        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>

        <Route path="/about">
          <About />
        </Route>

        <Route path="/">
          <Notification notification={notification} />
          <AnecdoteList anecdotes={anecdotes} />
        </Route>
      </Switch>

      <div>
        <Footer />
      </div>
    </div>
  )
}

export default App;