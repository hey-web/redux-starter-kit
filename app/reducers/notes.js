import { REQUEST_POSTS, RECIEVE_POSTS, SEND_ADD_NOTE, RECEIVE_ADD_NOTE, SEND_DROP_NOTE, RECEIVE_DROP_NOTE, RECEIVE_UPDATE_NOTE } from '../actions/syncNotes'
import { EDIT_NOTE, EDITING_NOTE } from '../actions'

const note = (state, action) => {
	switch (action.type) {
		case 'ADD_NOTE':
			return {
				id: action.id,
				text: action.text
			}
		default: 
			return state
	}
}

const notes = (state = { entries: {} }, action) => {
	switch (action.type) {
		case REQUEST_POSTS : 
			return Object.assign({}, state, {
				    	isFetching: true,
      					didInvalidate: false
			})
		case RECIEVE_POSTS : 
			return Object.assign({}, state, {
				    	isFetching: false,
      					didInvalidate: false,
      					entries: action.post
			})
		case RECEIVE_ADD_NOTE:
			state.entries[action.post.id] = action.post
		  	return Object.assign({}, state)
		case RECEIVE_DROP_NOTE:
			delete state.entries[action.id]
			return Object.assign({}, state)
		case EDIT_NOTE:
			state.entries[action.id].editing = true
			return Object.assign({}, state)
		case EDITING_NOTE:
			state.entries[action.id].text = action.text
			return Object.assign({}, state)
		case RECEIVE_UPDATE_NOTE: 
			state.entries[action.id].editing = false
			return Object.assign({}, state)
		default: 
			return state
	}
}



export default notes