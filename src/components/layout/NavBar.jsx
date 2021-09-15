import React from 'react'
import { Link } from 'react-router-dom'
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const style = {
  padding: 5,
  paddingLeft: 10,
  paddingTop: 10,
  backgroundColor: '#eaeaea'
}

const NavBar = ({ user }) => {
  const links = user ? <SignedInLinks user={user} /> : <SignedOutLinks />
  return (
    <div style={style} className='navbar'>
      <Link to='/blogs' className='navlink'>Blogs</Link>
      {links}
    </div>
  )
}

export default NavBar