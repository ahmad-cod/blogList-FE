import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import userServices from './services/users'
import login from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createBlog, initializeBlogs } from './reducers/blogsReducer'
import { clearNotification, createNotification } from './reducers/notificationReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, removeUser } from './reducers/loginUserReducer'
import Users from './components/Users'
import User from './components/User'
import BlogDetails from './components/BlogDetails'
import NavBar from './components/NavBar'


const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogListUser')
    if(loggedInUser){
      dispatch(setUser(JSON.parse(loggedInUser)))
    }
  }, [])

  useEffect(() => {
    blogServices.getAll()
      .then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    userServices.getUsers()
      .then(users => dispatch(initializeUsers(users)))
  }, [])

  const blogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!username || !password) return
    try {
      const user = await login({ username, password })
      if(!user){
        setTimeout(() => dispatch(clearNotification()), 4000)
        return dispatch(createNotification({ type: 'failure', text: 'Wrong username or password' }))
      }

      dispatch(setUser(user))
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      dispatch(createNotification({ text: 'Wrong Credentials', type: 'failure' }))
      setTimeout(() => dispatch(clearNotification()), 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    dispatch(removeUser())
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogServices.setToken(user.token)
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogServices.create({ title, author, url })
    dispatch(createBlog(newBlog))
    console.log('addBlog')
    setTitle('')
    setAuthor('')
    setUrl('')
    dispatch(createNotification({
      type: 'success',
      text: `a new blog ${newBlog.title} by ${newBlog.author}`
    }))
    setTimeout(() => dispatch(clearNotification()), 4000)
  }

  const notification = !message.type ? null :
    <p id='notificationMsg' className={`notification ${message.type}`}>{message.text} </p>
  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm
          username={username}
          password={password}
          handleSubmit={handleSubmit}
          handleUsernameChange={({ target }) => setUsername(target.value) }
          handlePasswordChange={({ target }) => setPassword(target.value) }
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm
          handleSubmit={addBlog}
          title={title}
          author={author}
          url={url}
          handleTitleChange={({ target }) => setTitle(target.value)}
          handleAuthorChange={({ target }) => setAuthor(target.value)}
          handleUrlChange={({ target }) => setUrl(target.value)}  />
      </Togglable>
    )
  }

  if(user === null || !user){
    return (
      <div>
        <h1>Blogs</h1>
        <div> {notification} </div>
        {loginForm()}
      </div>
    )
  }
  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')
  // console.log(match.params)
  const userToDisplay = userMatch ? users.find(user => user.id === userMatch.params.id) : null
  const blogToDisplay = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  return(
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <h2>Blog App</h2>
      <div> {notification} </div>
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      <Switch>
        <Route path='/users/:id' >
          <User user={userToDisplay} />
        </Route>
        <Route path='/users' >
          <Users />
        </Route>
        <Route path='/blogs/:id' >
          <BlogDetails blog={blogToDisplay} />
        </Route>
        <Route path='/'>
          { blogForm() }
          {blogs ?
            blogs
              .sort((a, b) => b.likes - a.likes)
              .map(blog =>
                <Blog key={blog.id} blog={blog} user={user} />  )
            : '<p>No blog</p>'}
        </Route>
      </Switch>
    </div>
  )
}

export default App