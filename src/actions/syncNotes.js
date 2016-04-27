import fetch from 'isomorphic-fetch'

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
			.then(reponse => response.json())
			.then(json => dispatch(recievePosts( json)))
	}
}