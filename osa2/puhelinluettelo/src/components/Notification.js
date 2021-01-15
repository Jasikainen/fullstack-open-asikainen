const Notification = ({ message }) => {
  const successStyle = { 
      color: "green",
      background: "lightgrey",
      fontSize: 20,
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
    <div style={successStyle}>
      {message}
    </div>
  )
}

export default Notification