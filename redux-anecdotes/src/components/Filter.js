import React from 'react'
import { connect } from 'react-redux'
import { setFilter, resetFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  const handleChange = (event) => {
    console.log(`Filter Value: ${event.target.value}`)
    const filter = event.target.value
    props.setFilter(filter)
  }

  const reset = () => { props.resetFilter() }
  
  return (
    <div style={style}>
      <div>
        Filter anecdotes <input value={props.filter} onChange={handleChange} />
      </div>
      <button onClick={() => reset()}>reset</button>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter
  }
}

const mapDispatchToProps = {
  setFilter,
  resetFilter
}

const ConnectedFilter = connect(mapStateToProps, mapDispatchToProps)(Filter)
export default ConnectedFilter