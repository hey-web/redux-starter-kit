import { connect } from 'react-redux'
import { addNote} from '../actions'
import NoteList from '../components/NoteList'

const mapStateToProps = (state) => {
  return {
    notes: state.notes
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    
  }
}

const VisibleTodoList = connect(
  mapStateToProps
  //,mapDispatchToProps
)(NoteList)

export default VisibleTodoList