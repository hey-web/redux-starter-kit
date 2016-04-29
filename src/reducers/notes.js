import { REQUEST_POSTS, RECIEVE_POSTS, SEND_ADD_NOTE, RECEIVE_ADD_NOTE,
		SEND_DROP_NOTE, RECEIVE_DROP_NOTE } from '../actions/syncNotes'

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


const notes = (state = { entries: [] }, action) => {
	switch (action.type) {
		case REQUEST_POSTS : 
			return Object.assign({}, state, {
				    	isFetching: true,
      					didInvalidate: false
			})
		case RECIEVE_POSTS : 
			let entries = []
			for(let x in action.posts){
				let note = action.posts[x]
				note.id = x
				entries.push(note)
			}

			return Object.assign({}, state, {
				    	isFetching: false,
      					didInvalidate: false,
      					entries
			})
		case SEND_ADD_NOTE: 
			return Object.assign({}, state, {
				    	isFetching: false,
      					didInvalidate: false
			})
		case RECEIVE_ADD_NOTE:
			state.entries.push({ id: action.id, text: action.text })
			return Object.assign({}, state, {
				    	isFetching: false,
      					didInvalidate: false
			})
		case RECEIVE_DROP_NOTE:
			state.entries.splice(state.entries.findIndex((note)=>{ return note.id === action.id }), 1)
			return Object.assign({}, state, {
				    	isFetching: false,
      					didInvalidate: false
			})
		case 'ADD_NOTE':
/*			return [
		        ...state,
		        note(undefined, action)
		      ]*/
		  	return Object.assign({}, state, {entries:[...state.entries, note(undefined, action)]})
		default: 
			return state
	}
}



export default notes