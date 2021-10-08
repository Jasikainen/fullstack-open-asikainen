 import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  // Fetch data once
  useEffect(() => {
    axios
      .get(baseUrl)
      .then(response => {
        setResources(response.data)
      })
  }, [])

  const create = async (resource) => { 
    const response = await axios.post(baseUrl, resource)
    setResources(resources.concat(response.data))
  }

  const del = async (resource) => {
    const response = await axios.delete(`${baseUrl}/${resource.id}`)
    setResources(resources.filter((item) => item.id !== resource.id))
  }

  const service = { create, del }
  return [resources, service]
}

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
  }

  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
  }

  const handleDelete = (item, service) => { service.del(item) }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {notes.map(note => 
        <div key={note.id}>
          <div>
            {note.content}
            <button onClick={() => handleDelete(note, noteService)}>delete</button>
          </div>
        </div>
       )}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(person => 
        <div key={person.id}>
          <div>
            {person.name} {person.number}
            <button onClick={() => handleDelete(person, personService)}>delete</button>
          </div>
        </div>
       )}
    </div>
  )
}

export default App