import { connect } from 'react-redux'
import { addNote, updateNote, dropNote} from '../actions/syncNotes'
import NoteList from '../components/NoteList'

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onAddNote: (text) => {dispatch(addNote(text))},
    onUpdateNote: (id,text) => {dispatch(updateNote(id, text))},
    onDropNote: (id) => {dispatch(dropNote(id))}
  }
}

const VisibleTodoList = connect(
  mapStateToProps,
  mapDispatchToProps
)(NoteList)

export default VisibleTodoList