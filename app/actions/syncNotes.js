import fetch from 'isomorphic-fetch'

let serverPath = 'http://localhost:4000'


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
    post: json,
    recievedAt: Date.now() 
  }
}

export const fetchNotes = () => {
	return dispatch => {

		dispatch(requestPosts())

		return fetch('http://localhost:4000/')
			.then(response => response.json())
			.then(json => dispatch(recievePosts( json)))
	}
}


//1 Add Note

export const SEND_ADD_NOTE = 'SEND_ADD_NOTE'
export const RECEIVE_ADD_NOTE = 'RECEIVE_ADD_NOTE'
const sendAddNote = () => {
  return {
    type: SEND_ADD_NOTE
  }
}
const receiveAddNote = json => {
  return {
    type: RECEIVE_ADD_NOTE,
    post: json
  }
}

export const addNote = text => {
  return dispatch => {
    dispatch(sendAddNote())

    return fetch(serverPath, {
      method: 'POST',
      body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAddNote(json)))
  }
}

//2 Drop Note
export const SEND_DROP_NOTE = 'SEND_DROP_NOTE'
export const RECEIVE_DROP_NOTE = 'RECEIVE_DROP_NOTE'
const sendDropNote = id => ({
    type: SEND_DROP_NOTE,
    id
})
const receiveDropNote = id => ({
  type: RECEIVE_DROP_NOTE,
  id
})

export const dropNote = id => {
  return dispatch => {
    dispatch(sendDropNote(id))

    return fetch(serverPath + '/' + id, {
      method: 'DELETE'
    })
    .then(response => response.json())
    .then(json => dispatch(receiveDropNote(id)))
  }
}


//3 Update Note
export const SEND_UPDATE_NOTE = 'SEND_UPDATE_NOTE'
export const RECEIVE_UPDATE_NOTE = 'RECEIVE_UPDATE_NOTE'
const sendUpdateNote = id => ({
  type: SEND_UPDATE_NOTE,
  id
})
const receiveUpdateNote = id => ({
  type: RECEIVE_UPDATE_NOTE,
  id
})

export const updateNote = (id, text) => {
  return dispatch => {
    dispatch(sendUpdateNote(id))

    return fetch(serverPath + '/' + id, {
      method: 'PUT',
      body: JSON.stringify({text})
    })
    .then(response => response.json())
    .then(json => dispatch(receiveUpdateNote(id)))
  }
}