import React from 'react'
import Togglable from './Togglable'
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  margin: '5px 2px'
}

const Blog = ({blog}) => (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel="View">
            <p>Url: <a href={blog.url}>{blog.url}</a></p>
            <p>Likes: {blog.likes}</p>
    </Togglable>
  </div> 

)

export default Blog