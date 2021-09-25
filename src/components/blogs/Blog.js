import React from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListIcon,
  MdCheckCircle
} from '@chakra-ui/react'

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 5,
//   borderRadius: 5,
//   border: 'solid',
//   borderWidth: 1,
//   margin: '5px 2px'
// }

const Blog = ({ blog }) => {
  return (
    <List spacing={8}>
      <ListItem spacing={4}>
        <ListIcon as={MdCheckCircle} color="green.500" />
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} by {blog.author}
        </Link>
      </ListItem>
    </List>
  )
}

export default Blog


{/* <Togglable buttonLabel="View">
  <p className='blogUrl'>Url: <a href={blog.url}>{blog.url}</a></p>
  <p className='blogLikes'>Likes: {blog.likes}  <button onClick={handleLike}>Like</button>
  </p>
  {/* <p>{blog.user.name}</p> */}
//   <p>
//     {blog.user.username === user.username ?
//       <button onClick={handleRemove}>Remove</button> : ''
//     }
//   </p>
// </Togglable>