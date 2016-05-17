import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import App from './reducers'
import Moli from './components/Moli'
import { fetchNotes } from './actions/syncNotes'

let store = createStore(App, 
	applyMiddleware(
		thunkMiddleware
	)
)

store.dispatch(fetchNotes())

render(
  <Provider store={store}>
    <Moli />
  </Provider>
  ,
  document.getElementById('root')
)