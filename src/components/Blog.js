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

const Blog = ({blog, setUpdate}) => {
  const handleLike = async () => {
    const updateBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    try {
      await blogServices.update(blog.id, updateBlog)
    
      setUpdate(Math.floor(Math.random * 1000))
      setUpdate(null)
    } catch (e) {
      console.log(e)
    }

  }

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="View">
            <p>Url: <a href={blog.url}>{blog.url}</a></p>
            <p>Likes: {blog.likes}  
              <button onClick={handleLike}>Like</button>
            </p>
    </Togglable>
  </div> 
  )
}

export default Blog