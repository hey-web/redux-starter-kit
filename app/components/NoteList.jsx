import React, { PropTypes } from 'react'
import Note from './Note'

const NoteList = ({ notes }) => (
  <ul>
    {notes.entries.map(note =>
      <Note
        key={note.id}
        {...note}
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
  }).isRequired
  //,
  //onTodoClick: PropTypes.func.isRequired
}

export default NoteList