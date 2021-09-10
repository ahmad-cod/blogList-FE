import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import login from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { createBlog, initializeBlogs } from './reducers/blogsReducer'
import { clearNotification, createNotification } from './reducers/notificationReducer'


const App = () => {
  const dispatch = useDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogListUser')
    if(loggedInUser){
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    blogServices.getAll()
      .then(blogs => dispatch(initializeBlogs(blogs)))
  }, [update])

  const initBlogs = useSelector(state => state.blogs)
  const message = useSelector(state => state.notification)

  const handleSubmit = async (event) => {
    event.preventDefault()
    if(!username || !password) return
    try {
      const user = await login({ username, password })
      if(!user){
        setTimeout(() => dispatch(clearNotification()), 4000)
        return dispatch(createNotification({ type: 'failure', text: 'Wrong username or password' }))
      }

      setUser(user)
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
    setUser(null)
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogServices.setToken(user.token)
    blogFormRef.current.toggleVisibility()
    const newBlog = await blogServices.create({ title, author, url })
    dispatch(createBlog)
    console.log('addBlog')
    setUpdate(true)
    setUpdate(null)
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
  return(
    <div>
      <h2>Blogs</h2>
      <div> {notification} </div>
      <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
      { blogForm() }
      {initBlogs ?
        initBlogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog =>
            <Blog key={blog.id} blog={blog} setUpdate={setUpdate} user={user} />  )
        : '<p>No blog</p>'}
    </div>
  )
}

export default App