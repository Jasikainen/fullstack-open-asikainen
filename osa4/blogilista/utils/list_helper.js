var _ = require('lodash')

const dummy = (blogs) => {
  return blogs.length === 0
    ? 1
    : blogs.length
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item.likes
  }
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  var maxLikes = Math.max(...blogs.map(blog => blog.likes))
  var mostVotedBlog = blogs.find(blog => blog.likes === maxLikes)

  return blogs.length === 0
    ? undefined
    : mostVotedBlog
}

const mostBlogs = (blogs) => {
  var blogsPartioned = []

  // Filter out unique blog authors
  const uniqueAuthors =
    blogs
      .map(blog => blog.author)
      .filter((value, index, self) => self.indexOf(value) === index)

  // For each author check how many blogs they have written total
  uniqueAuthors.forEach(author => {
    const authorObject =
    {
      author: author,
      blogs: (_.filter(blogs, ['author', author])).length
    }
    blogsPartioned.push(authorObject)
  })

  // Find the author with most blog posts written
  const maxBlogs = Math.max(...blogsPartioned.map(blog => blog.blogs))
  const mostBlogsAuthor = blogsPartioned.find(blog => blog.blogs === maxBlogs)
  console.log(mostBlogsAuthor)
  return blogsPartioned.length === 0
    ? undefined
    : mostBlogsAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}