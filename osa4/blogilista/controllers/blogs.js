const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.url === undefined || body.title === undefined) {
    return response.status(400).end()
  }

  const user = await User.findById(body.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
      !== undefined
      ? body.likes
      : 0,
    user: user._id
  })
  const savedBlog = await blog.save()

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