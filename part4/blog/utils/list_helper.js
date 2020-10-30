//const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return (
    blogs.reduce((sum, current) => sum + current.likes, 0)
  )
}

const favouriteBlog = (blogs) => {
  let favBlog = blogs[0]
  for (let i = 0; i < blogs.length; i++) {
    if (blogs[i].likes > favBlog.likes) {
      favBlog = blogs[i]
    }
  }
  delete favBlog.__v
  delete favBlog._id
  delete favBlog.url
  return (
    favBlog
  )
}

/*const mostBlogs = (blogs) => {

  const { countBy, entries, flow, head, last, maxBy, partialRight } = _

  const result = flow(
    countBy,
    entries,
    partialRight(maxBy, last),
    head
  )(blogs)

  return (
    result
  )
}*/

module.exports = {
  dummy, totalLikes, favouriteBlog//, mostBlogs
}