import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import {
  Container,
  Box,
  Flex,
  Text
} from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
const BlogList = () => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  if(!blogs) {
    return <p>No blog</p>
  }

  return (
    <Container>
      <Flex>
        <BellIcon color='gray.500' mr='10px'/>
        <Text
          fontWeight='700'
          letterSpacing='0.083em'
          fontSize='12px'
          lineHeight='16px'
          color='rgba(41, 41, 41, 1)'
        >TRENDING ON BLOGGS</Text>
      </Flex>
      <Box>
        { blogs.sort((a, b) => b.likes - a.likes)
          .map((blog, index) => <Blog key={blog.id} blog={blog} index={index} user={user} />)
        }
      </Box>
    </Container>
  )
}

export default BlogList