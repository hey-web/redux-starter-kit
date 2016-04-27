const genNoteId = () => {
  return (Math.random() + '').substring(2)
}

export const addNote = text => {
  return {
    type: 'ADD_NOTE',
    id: genNoteId(),
    text
  }
}

export const updateNote = (id, text) => {
  return {
    type: 'UPDATE_NOTE',
    id,
    text
  }
}

export const dropNote = id => {
  return {
    type: 'DROP_NOTE',
    id
  }
}
