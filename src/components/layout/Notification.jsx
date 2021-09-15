import React from 'react'
import { useSelector } from 'react-redux'



const Notification = () => {
  const message = useSelector(state => state.notification)
  if(!message.type) return null

  return (
    <p id='notificationMsg' className={`notification ${message.type}`}>{message.text} </p>
  )
}

export default Notification