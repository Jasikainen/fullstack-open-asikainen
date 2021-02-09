const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body
  // request must have valid body to continue
  if (body.url === undefined || body.title === undefined) {
    return response.status(400).end()
  }

  const token = request.token // Middleware handles token extraction

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token is missing or invalid' })
  }

  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
      !== undefined
      ? body.likes
      : 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  console.log("savedBlog", savedBlog)
  user.blogs = user.blogs.concat(savedBlog.id)
  console.log("user.blogs", user.blogs)
  console.log("await User.findById(decodedToken.id)", await User.findById(decodedToken.id))
  response.json(savedBlog.toJSON())
})


blogsRouter.delete('/:id', async (request, response) => {
  const databaseResponse = await Blog.findByIdAndRemove(request.params.id)
  if (databaseResponse){
    return response.status(204).end()
  }
  return response.status(404).end()
})


blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(newBlog.toJSON())
  } catch (exception) {
    next(exception)
  }

})

module.exports = blogsRouter