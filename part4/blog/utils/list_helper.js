const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((sum, current) => sum + current.likes, 0)
  )
}

const favouriteBlog = (blogs) => {
  let favBlog = blogs[0]
  for (let i = 0; i < blogs.length; i++)
  {
    if (blogs[i].likes > favBlog.likes)
    {
      favBlog = blogs[i]
    }
  }
  return (
    favBlog
  )
}

module.exports = {
  dummy, totalLikes, favouriteBlog
}