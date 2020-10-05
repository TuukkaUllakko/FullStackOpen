import React from 'react'
import '../index.css'

const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }
  
    return (
      <div className="error">
        {message.message}
      </div>
    )
  }

export default ErrorNotification