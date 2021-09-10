import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { combineReducers, createStore } from 'redux'
import './index.css'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import { Provider } from 'react-redux'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer
})

const store = createStore(reducer)

ReactDOM.render(<Provider store={store}>
  <App />
</Provider>, document.getElementById('root'))