const genNoteId = () => {
  return (Math.random() + '').substring(2)
}

export const EDIT_NOTE = 'EDIT_NOTE'
export const editNote = id => {
  return {
    type: EDIT_NOTE,
    id
  }
}

export const EDITING_NOTE = 'EDITING_NOTE'
export const editingNote = (id, text) => ({
	type: EDITING_NOTE,
	id,
	text
})

