import React, { useState } from 'react'

const Blog = ({ blog }) => {

  const [showAll, setShowAll] = useState(false)

  const hideShowAll = { display: showAll ? 'none' : '' }
  const showShowAll = { display: showAll ? '' : 'none' }

  const like = () => {
    console.log('make this function for liking blogs later')
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div style={hideShowAll}>
        {blog.title} by {blog.author} <button onClick={() => setShowAll(true)}>View</button>
      </div>
      <div style={showShowAll}>
        {blog.title} by {blog.author} <button onClick={() => setShowAll(false)}>Hide</button>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={like}>Like!</button></div>
      </div>
    </div>
  )

}


export default Blog
