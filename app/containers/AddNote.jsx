import React from 'react'
import { connect } from 'react-redux'
import { addNote } from '../actions/syncNotes'

let AddNote = ({ dispatch }) => {
  let textArea

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!textArea.value.trim()) {
          return
        }
        dispatch(addNote(textArea.value))
        textArea.value = ''
      }}>
        <textarea ref={node => {
          textArea = node
        }}>
        </textarea>
        <button type="submit">
          Add Note
        </button>
      </form>
    </div>
  )
}

AddNote = connect()(AddNote)

export default AddNote