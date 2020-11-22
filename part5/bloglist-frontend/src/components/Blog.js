import React, { useState } from 'react'

const Blog = ({ blog, updateBlog, deleteBlog, user }) => {

  const [showAll, setShowAll] = useState(false)

  const hideShowAll = { display: showAll ? 'none' : '' }
  const showShowAll = { display: showAll ? '' : 'none' }
  let showRemoveButton = { display: 'none' }
  if (user.name === blog.user.name) showRemoveButton = { display: '' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike = () => {
    const likedBlog = {
      title: blog.title,
      id: blog.id,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    updateBlog(likedBlog.id, likedBlog)
  }

  const handleRemoval = () => {
    deleteBlog(blog.id, blog.title, blog.author)
  }

  return (
    <div style={blogStyle} className='blog'>
      <div style={hideShowAll} className='notShown'>
        {blog.title} by {blog.author} <button onClick={() => setShowAll(true)}>View</button>
      </div>
      <div style={showShowAll}>
        {blog.title} by {blog.author} <button onClick={() => setShowAll(false)}>Hide</button>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={() => handleLike()}>Like!</button></div>
        <div>Posted by: {blog.user.name}</div>
        <div style={showRemoveButton}><button onClick={() => handleRemoval()}>Remove</button></div>
      </div>
    </div>
  )

}


export default Blog
