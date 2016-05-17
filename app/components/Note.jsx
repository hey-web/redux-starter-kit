import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

const Note = ({ id,text, editing, onEdit, onEditing, onSave, onDrop}) => (
  <li>
    {
      editing
       ?<div><textarea value={text} onChange={event => {
        onEditing(event.target.value)
       }}></textarea><button onClick={()=>onSave(id, text)}>save</button></div>
       :(<div><span>{text}</span><button onClick={onEdit}>Edit</button><button onClick={onDrop}>Drop</button></div>)
    }
  </li>
)

Note.propTypes = {
  id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  editing: PropTypes.bool,
  onEdit: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default Note