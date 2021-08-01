import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogServices from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [update, setUpdate] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [message, setMessage] = useState({})
  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogListUser')
    if(loggedInUser){
      setUser(JSON.parse(loggedInUser))
    }
  }, [])

  useEffect(() => {
    blogServices.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [update])
  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log('form submitted')
    try {
      const user = await loginService({ username, password })
      if(!user){
        setTimeout(() => {
          setPassword('')
          setMessage({})
        }, 2000)
        
        return setMessage({type: 'failure', text: 'Wrong username or password'})
      }

      setUser(user)
      window.localStorage.setItem('blogListUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch(exception) {
      console.log(exception)
      setMessage({text: 'Wrong Credentials', type: 'failure'})
      setTimeout(() => {
        setMessage({})
      }, 5000)
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
    setBlogs(blogs.concat(newBlog))
    setTitle('')
    setAuthor('')
    setUrl('')
    setMessage({
      type: 'success',
      text: `a new blog ${newBlog.title} by ${newBlog.author}`
    })
    setTimeout(() => {
      setMessage({})
    }, 4000)
  }

  const notification = (!message.type) ? null : 
  <p className= {`notification ${message.type}`}>{message.text} </p>
   const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <div> {notification} </div>
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
        handleUrlChange={({ target }) => setUrl(target.value)} 
      />
      </Togglable>
     )
   }

  if(user === null || !user){
    return loginForm()
  } 
  return(
      <div>
        <h2>Blogs</h2>
        <div> {notification} </div>
        <div>{user.name} logged in <button onClick={handleLogout}>logout</button></div>
        { blogForm() }
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setUpdate={setUpdate} />
          
        )}
      </div>
  )
}

export default App