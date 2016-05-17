import React, { PropTypes } from 'react'
import Note from './Note'

const NoteList = ({ notes, editNote, editingNote, onUpdateNote, onDropNote}) => (
  <ul>
    {Object.keys(notes.entries).map(id => 
      <Note key={id} {...notes.entries[id]} onDrop={() => onDropNote(id)} onEdit={() => editNote(id)} onEditing={text => editingNote(id, text)}
      onSave={onUpdateNote}/>
    )}
  </ul>
)

NoteList.propTypes = {
  notes: PropTypes.shape({
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool,
    entries: PropTypes.object.isRequired
  }).isRequired,
  onDropNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  editingNote: PropTypes.func.isRequired,
  onUpdateNote: PropTypes.func.isRequired
}

export default NoteList