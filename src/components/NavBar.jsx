import React from 'react'
import { Link } from 'react-router-dom'

const style = {
  padding: 5,
  paddingLeft: 10,
  paddingTop: 10,
  backgroundColor: '#eaeaea'
}

const NavBar = ({ user, handleLogout }) => {
  return (
    <div style={style} className='navbar'>
      <Link to='/blogs' className='navlink'>Blogs</Link>
      <Link to='/users' className='navlink'>Users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar