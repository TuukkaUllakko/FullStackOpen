import React from 'react'
import '../index.css'

const AddedNotification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="added">
      {message.message}
    </div>
  )
}

export default AddedNotification