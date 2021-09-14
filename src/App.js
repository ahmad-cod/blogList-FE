import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router'
import Blog from './components/blogs/Blog'
import blogServices from './services/blogs'
import userServices from './services/users'
import LoginForm from './components/auth/LoginForm'
import BlogForm from './components/blogs/BlogForm'
import Togglable from './components/Togglable'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setUser, removeUser } from './reducers/loginUserReducer'
import Users from './components/users/Users'
import User from './components/users/User'
import BlogDetails from './components/blogs/BlogDetails'
import NavBar from './components/NavBar'
import Notification from './components/Notification'


const App = () => {
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('blogListUser')
    if(loggedInUser){
      dispatch(setUser(JSON.parse(loggedInUser)))
    }
  }, [dispatch])

  useEffect(() => {
    blogServices.getAll()
      .then(blogs => dispatch(initializeBlogs(blogs)))
  }, [dispatch])

  useEffect(() => {
    userServices.getUsers()
      .then(users => dispatch(initializeUsers(users)))
  }, [dispatch])

  const userMatch = useRouteMatch('/users/:id')
  const blogMatch = useRouteMatch('/blogs/:id')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)



  const handleLogout = () => {
    window.localStorage.removeItem('blogListUser')
    dispatch(removeUser())
  }


  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in">
        <LoginForm />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="Add Blog" ref={blogFormRef}>
        <BlogForm user={user} blogFormRef={blogFormRef} />
      </Togglable>
    )
  }

  if(user === null || !user){
    return (
      <div>
        <h1>Blogs</h1>
        <Notification />
        {loginForm()}
      </div>
    )
  }

  const userToDisplay = userMatch ? users.find(user => user.id === userMatch.params.id) : null
  const blogToDisplay = blogMatch ? blogs.find(blog => blog.id === blogMatch.params.id) : null
  return(
    <div>
      <NavBar user={user} handleLogout={handleLogout} />
      <h2>Blog App</h2>
      <Notification />
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