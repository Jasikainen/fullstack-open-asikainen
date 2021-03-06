import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = {
    display: visible ? '' : 'none',
    backgroundColor: 'rgba(200, 200, 150, .5)'
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })
  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  // This handles the visibility of props.buttonlabel
  // Which changes the visibility of the children of this component
  return (
    <div>

      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>

      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>

    </div>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
