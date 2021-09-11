import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { combineReducers, createStore } from 'redux'
import './index.css'
import blogsReducer from './reducers/blogsReducer'
import notificationReducer from './reducers/notificationReducer'
import { Provider } from 'react-redux'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/loginUserReducer'
import { BrowserRouter } from 'react-router-dom'

const reducer = combineReducers({
  blogs: blogsReducer,
  notification: notificationReducer,
  users: usersReducer,
  user: userReducer
})

const store = createStore(reducer)

ReactDOM.render(<BrowserRouter>
  <Provider store={store}>
    <App />
  </Provider>
</BrowserRouter>, document.getElementById('root'))