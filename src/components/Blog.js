import React from 'react'
import blogServices from '../services/blogs'
import Togglable from './Togglable'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  margin: '5px 2px'
}

const Blog = ({ blog, setUpdate, user }) => {
  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogServices.update(blog.id, updateBlog)
      setUpdate(true)
      setUpdate(null)
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
      setUpdate(true)
      setUpdate(null)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div style={blogStyle}>
      <div className='titleauthor'>
        {blog.title} by {blog.author}
      </div>
      <Togglable buttonLabel="View">
        <p className='blogUrl'>Url: <a href={blog.url}>{blog.url}</a></p>
        <p className='blogLikes'>Likes: {blog.likes}  <button onClick={handleLike}>Like</button>
        </p>
        <p>{blog.user.name}</p>
        <p>
          {blog.user.username === user.username ?
            <button onClick={handleRemove}>Remove</button> : ''
          }
        </p>
      </Togglable>
    </div> )
}

export default Blog