const Error = ({ message }) => {
  const errorStyle = { 
    color: "red",
    background: "lightgrey",
    fontSize: 12,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    marginLeft: 5,
    width: 300
}

  if (message === null) {
    return null
  } 

  return (
    <div style={errorStyle}>
      {message}
    </div>
  )
}

export default Error
