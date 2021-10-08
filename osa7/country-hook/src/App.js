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

// Hook
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  const fetchData = async () => {
    if (name)
    {
      try { 
      const response = await axios
        .get(`https://restcountries.com/v3.1/name/${name}?fullText=true`)

      setCountry({data: response.data, found: response.status === 200 ? true : false});
      }
      catch (err) {
        setCountry({found: false})
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [name])


  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }
  
  if (!country.found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  const data = country.data[0]
  const style = {
      backgroundColor: '#55ff6f', 
      borderStyle: 'groove',
      borderWidth: '3px', 
      marginLeft: '5px'
  }
  
  return (
    <div style={style}>
      <h2>Country information found</h2>
      <h3>{data.name.official} </h3>
      <div>Capital city: {data.capital} </div>
      <div>Population: {data.population}</div> 
      <br />
      <img src={data.flags.png} style={style} height='100' alt={`flag of ${data.name.official}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  // Fetch handles the change of nameInput to name State.
  // And this is connecnted to useCountry hook that fetches country if 
  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>
      
      <Country country={country} />
    </div>
  )
}

export default App
