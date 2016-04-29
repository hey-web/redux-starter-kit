import React, { PropTypes } from 'react'

const Note = ({ id, text, onUpdate, onDrop }) => (
  <li>
    <span>
    {text}
    </span>
    <button onClick={onUpdate}>Edit</button>
    <button onClick={onDrop}>Drop</button>
  </li>
)

Note.propTypes = {
  id : PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default Note