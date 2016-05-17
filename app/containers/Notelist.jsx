import { connect } from 'react-redux'
import { editNote, editingNote } from '../actions'
import { dropNote, updateNote } from '../actions/syncNotes'
import NoteList from '../components/NoteList'

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDropNote: id => dispatch(dropNote(id)),
    onUpdateNote: (id,text) => dispatch(updateNote(id, text)),
    editNote: id => dispatch(editNote(id)),
    editingNote: (id, text) => dispatch(editingNote(id, text))
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default VisibleTodoList