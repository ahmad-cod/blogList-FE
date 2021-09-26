import React from 'react'
import { Link } from 'react-router-dom'
import {
  Box,
  Text,
  Heading,
  Avatar,
  Flex
} from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

// const blogStyle = {
//   paddingTop: 10,
//   paddingLeft: 5,
//   borderRadius: 5,
//   border: 'solid',
//   borderWidth: 1,
//   margin: '5px 2px'
// }

const Blog = ({ blog, user, index }) => {
  return (
    <Flex my='14px'>
      <Box
        mr='16px'
        color='rgba(230, 230, 230, 1)'
        fontWeight='bold'
        lineHeight='36px'
        fontSize='30px'
      >0{index + 1}</Box>
      <Box>
        <Flex alignItems='center' my='8px'>
          <Avatar size='xs' name={user.name}></Avatar>
          <Heading
            pl='8px'
            fontSize='13px'
            lineHeight='17px'
            fontWeight='500'
          >{user.name}</Heading>
        </Flex>
        <Heading
          as='h2'
          my='4px'
          fontWeight='700'
          fontSize='16px'
          color='rgba(41, 41, 41, 1)'
          lineHeight='20px'
        >
          <Link to={`/blogs/${blog.id}`}>
            {blog.title}
          </Link>
        </Heading>
        <Box
          color='rgba(117, 117, 117, 1)'
          fontSize='13px'
          lineHeight='20px'>
          <Text as='span' size='xs'>Sep 15. </Text>
          <Text as='span' size='2xs' mr='8px'> 4 min read </Text>
          {blog.likes > 10 ? <StarIcon /> : ''}
        </Box>
      </Box>
    </Flex>
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