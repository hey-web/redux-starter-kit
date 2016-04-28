import fetch from 'isomorphic-fetch'

let serverPath = 'http://localhost:4000'

// 1 Load all notes

export const REQUEST_POSTS = 'REQUEST_POSTS'
const requestPosts = () => {
  return {
    type: REQUEST_POSTS
  }
}


export const RECIEVE_POSTS = 'RECIEVE_POSTS'
const recievePosts = (json) => {
  return {
    type: RECIEVE_POSTS,
    posts: json,
    recievedAt: Date.now() 
  }
}

//export const FETCH_NOTES = 'FETCH_NOTE'
//export const RECIEVE_NOTES = 'RECIEVE_NOTES'
export const fetchNotes = () => {
	return dispatch => {

		dispatch(requestPosts())

		return fetch('http://localhost:4000/')
			.then(response => response.json())
			.then(json => dispatch(recievePosts(json)))
	}
}

// 2 Sync created note to server
export const SEND_ADD_NOTE = 'SEND_ADD_NOTE'
const sendAddNote = () => {
  return {
    type: SEND_ADD_NOTE
  }
}
export const RECEIVE_ADD_NOTE = 'RECEIVE_ADD_NOTE'
const receiveAddNote = (json) => {
  return {
    type: RECEIVE_ADD_NOTE,
    id:　json.id
  }
}
export const addNote = text => {
  return dispatch => {
    dispatch(sendAddNote())

    return fetch('POST', serverPath)
      .then(response => response.json())
      .then(json => dispatch(receiveAddNote(json)))
  }
}
// 3 Sync note change to server
// 4 Drop note in server