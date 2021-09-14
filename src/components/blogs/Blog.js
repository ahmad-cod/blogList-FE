import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { deleteBlog, like } from '../../reducers/blogsReducer'
import { clearNotification, createNotification } from '../../reducers/notificationReducer'
import blogServices from '../../services/blogs'
import Togglable from '../Togglable'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 5,
  borderRadius: 5,
  border: 'solid',
  borderWidth: 1,
  margin: '5px 2px'
}

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogServices.update(blog.id, updateBlog)
      dispatch(like(blog))
      dispatch(createNotification({ text: `You liked ${blog.title}`, type: 'success' }))
      setTimeout(() => dispatch(clearNotification()), 4000)
      // setUpdate(null)
    } catch (e) {
      console.log(e)
    }
  }

  const handleRemove = async () => {
    if(!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){return false}
    try {
      blogServices.setToken(user.token)
      // console.log(blog)
      await blogServices.remove(blog.id)
      dispatch(deleteBlog(blog))
      dispatch(createNotification({ type: 'success', text: `You deleted ${blog.title}` }))
      setTimeout(() => dispatch(clearNotification()))
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='titleauthor'>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </div>
      <Togglable buttonLabel="View">
        <p className='blogUrl'>Url: <a href={blog.url}>{blog.url}</a></p>
        <p className='blogLikes'>Likes: {blog.likes}  <button onClick={handleLike}>Like</button>
        </p>
        {/* <p>{blog.user.name}</p> */}
        <p>
          {blog.user.username === user.username ?
            <button onClick={handleRemove}>Remove</button> : ''
          }
        </p>
      </Togglable>
    </div> )
}

export default Blog