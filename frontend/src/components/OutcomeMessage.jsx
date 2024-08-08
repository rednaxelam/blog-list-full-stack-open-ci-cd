const OutcomeMessage = ({ outcomeMessage }) => {
  let style = undefined

  if (outcomeMessage[0] === 'success') {
    style = {
      color: 'DarkGreen',
      backgroundColor: 'LightGray',
      border: 'Green 3px solid',
      borderRadius: '5px',
      fontSize: '16px',
      padding: '10px'
    }
  } else if (outcomeMessage[0] === 'failure') {
    style = {
      color: 'Red',
      backgroundColor: 'LightGray',
      border: 'Red 3px solid',
      borderRadius: '5px',
      fontSize: '16px',
      padding: '10px'
    }
  } else {
    style = {
      color: 'Black',
      backgroundColor: 'LightGray',
      border: 'Black 3px solid',
      borderRadius: '5px',
      fontSize: '16px',
      padding: '10px'
    }
  }

  return <p style={style}>
    {outcomeMessage[1]}
  </p>
}

export default OutcomeMessage