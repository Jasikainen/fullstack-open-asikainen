var _ = require('lodash')

// brief: Used with reduce() to calculate sum of elements
const reducer = (sum, item) => {
  return sum + item.likes
}
// brief: used to return unique authors as a list of blog list
const uniqueAuthors = (blogs) => {
  return blogs
    .map(blog => blog.author)
    .filter((value, index, self) => self.indexOf(value) === index)
}


// brief: just simple dummy test which returns always "one"
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}


// brief: used to return total likes of listed blogs
const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce(reducer, 0)
}


// brief: Used to return blog that has most likes
const favoriteBlog = (blogs) => {
  var maxLikes = Math.max(...blogs.map(blog => blog.likes))
  var mostVotedBlog = blogs.find(blog => blog.likes === maxLikes)
  const authorObject =
    {
      title: mostVotedBlog.title,
      author: mostVotedBlog.author,
      likes: mostVotedBlog.likes
    }
  return blogs.length === 0
    ? undefined
    : authorObject
}


// brief: Used to return author that has most blogs posted
const mostBlogs = (blogs) => {
  var blogsPartioned = []
  const authors = uniqueAuthors(blogs)

  // For each author check how many blogs they have written total
  authors.forEach(author => {
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

  return blogsPartioned.length === 0
    ? undefined
    : mostBlogsAuthor
}

// brief: Used to return author that has most total likes
const mostLikes = (blogs) => {
  var blogsPartioned = []
  const authors = uniqueAuthors(blogs)

  // For each author check calculate many likes their blogs have in total
  authors.forEach(author => {
    const amountLikes = _.filter(blogs, ['author', author]).reduce(reducer, 0)
    const authorObject =
    {
      author: author,
      likes: amountLikes
    }
    blogsPartioned.push(authorObject)
  })

  // Find the author with most likes received
  const maxLikes = Math.max(...blogsPartioned.map(blog => blog.likes))
  const mostLikesAuthor = blogsPartioned.find(blog => blog.likes === maxLikes)

  return blogsPartioned.length === 0
    ? undefined
    : mostLikesAuthor
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}