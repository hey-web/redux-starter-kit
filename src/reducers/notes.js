import { REQUEST_POSTS, RECIEVE_POSTS } from '../actions/syncNotes'

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

const posts = (state = { isFetching: false, didInvalidate: false}, action) => {

}

const notes = (state = { entries: [] }, action) => {
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
      					entries: action.posts
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