const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (body.url === undefined || body.title === undefined) {
    return response.status(400).end()
  }
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes !== undefined ?
      body.likes
      : 0
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


module.exports = blogsRouter