import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch()
  const filter = useSelector(state => state.filter)
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    console.log(`Filter Value: ${event.target.value}`)
    const filter = event.target.value
    dispatch(setFilter(filter))
  }

  const reset = () => { dispatch(resetFilter()) }
  
  return (
    <div style={style}>
      <div>
        Filter anecdotes <input value={filter} onChange={handleChange} />
      </div>
      <button onClick={() => reset()}>reset</button>
    </div>
  )
}

export default Filter