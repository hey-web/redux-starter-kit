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
const receiveAddNote = (text, json) => {
  return {
    type: RECEIVE_ADD_NOTE,
    id:　json.id,
    text
  }
}
export const addNote = text => {
  return dispatch => {
    dispatch(sendAddNote())

    return fetch(serverPath, {
      method: 'POST',
      body: JSON.stringify({ text:text })
    })
    .then(response => response.json())
    .then(json => dispatch(receiveAddNote(text, json)))
  }
}
// 3 Sync note change to server
export const SEND_UPDATE_NOTE = 'SEND_UPDATE_NOTE'
const sendUpdateNote = () => {
  return {
    type: SEND_UPDATE_NOTE
  }
}

export const RECEIVE_UPDATE_NOTE = 'RECEIVE_UPDATE_NOTE'
const receiveUpdateNote = () => {
  return {
    type: RECEIVE_UPDATE_NOTE
  }
}

export const updateNote = (id, text) => {
  return dispatch => {
    dispatch(sendUpdateNote)
    return fetch('PUT', serverPath)
      .then( () => dispatch(receiveUpdateNote()) )
  }
}
// 4 Drop note in server
export const SEND_DROP_NOTE = 'SEND_DROP_NOTE'
const sendDropNote = id => {
  return {
    type: SEND_DROP_NOTE,
    id
  }
} 
export const RECEIVE_DROP_NOTE = 'RECEIVE_DROP_NOTE'
const receiveDropNote = id => {
  return {
    type: RECEIVE_DROP_NOTE,
    id
  }
}

export const dropNote = id => {
  return dispatch => {
    dispatch(sendDropNote(id))

    return fetch([serverPath,id].join('/'), {
        method: 'DELETE'
    })
    .then(() => dispatch(receiveDropNote(id)) )
  }
}