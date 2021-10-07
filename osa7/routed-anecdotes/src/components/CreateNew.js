import React from 'react'
import  { useField } from '../hooks/index.js'
import {
  useHistory
} from 'react-router-dom'

const HTTPS = 'https://'

const CreateNew = (props) => {
  const history = useHistory()
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  
  const handleSubmit = (e) => {
    e.preventDefault()

    const anecdoteObject = {
      content: content.value ,
      author: author.value,
      info: isValidHttpUrl(info) ? info.value : HTTPS + info.value,
      votes: 0
    }
    props.addNew(anecdoteObject)
    history.push('/') // Back to default page
  }
  const handleClick = () => {
    content.resetValue()
    author.resetValue()
    info.resetValue()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            name="content"
            {...content.inputSpread()}
          />
        </div>
        <div>
          author
          <input 
            name="author"
            {...author.inputSpread()} 
          />
        </div>
        <div>
          url for more info
          <input
            name="info"
            {...info.inputSpread()}
            />
        </div>
        <button type="submit">create</button>
        <button type="reset" onClick={handleClick}>reset form</button>
      </form>
    </div>
  )
}

const isValidHttpUrl = (info) => {
  let infoToUrl;
  try 
  { infoToUrl = new URL(info) } 
  catch (_) 
  { return false }

  return infoToUrl.protocol === "http:" || infoToUrl.protocol === "https:";
}

export default CreateNew