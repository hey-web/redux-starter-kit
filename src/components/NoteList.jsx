import React, { PropTypes } from 'react'
import Note from './Note'

const NoteList = ({ notes, onUpdateNote, onDropNote }) => (
  <ul>
    {notes.entries.map(note =>
      <Note
        key={note.id}
        {...note}
        onUpdate = { (text) => onUpdateNote(note.id,text)}
        onDrop = { () => onDropNote(note.id)}
      />
    )}
  </ul>
)

NoteList.propTypes = {
  notes: PropTypes.shape({
    isFetching: PropTypes.bool,
    didInvalidate: PropTypes.bool,
    entries: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired
    })).isRequired
  }).isRequired,
  onUpdateNote: PropTypes.func.isRequired,
  onDropNote: PropTypes.func.isRequired
}

export default NoteList