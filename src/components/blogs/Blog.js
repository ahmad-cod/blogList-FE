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

const Blog = ({ blog, index }) => {
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
          <Avatar size='xs' name={blog.user.name}></Avatar>
          <Heading
            pl='8px'
            fontSize='13px'
            lineHeight='17px'
            fontWeight='500'
          >{blog.user.name}</Heading>
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
          {blog.likes > 10 ? <StarIcon h='11px'/> : ''}
        </Box>
      </Box>
    </Flex>
  )
}

export default Blog