import { Children, useState, cloneElement } from 'react'
import PropTypes from 'prop-types'

const Toggleable = ({ label, children }) => {
  const [displayContents, setDisplayContents] = useState(false)

  if (displayContents) {
    return <>
      {Children.map(children, (child) => cloneElement(child, { setVisibility: setDisplayContents }))}
      <button onClick={() => setDisplayContents(false)}>close</button>
    </>
  } else {
    return <button onClick={() => setDisplayContents(true)}>
      {label}
    </button>
  }
}

Toggleable.propTypes = {
  label: PropTypes.string.isRequired
}

export default Toggleable