import React, { PropTypes } from 'react'

const Note = ({ text }) => (
  <li>
    <span>
    {text}
    </span>
    <button>Edit</button>
    <button>Drop</button>
  </li>
)

Note.propTypes = {
  id : PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Note