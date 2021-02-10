const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})


blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  if (body.url === undefined || body.title === undefined) {
    return response.status(400).end()
  }

  // User should have valid token to be add a blog
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
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
      user: user._id
    })
    // Add the new blog to users list of their blogs
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    // user has to be saved for new blog to be added in DB
    await user.save()
    response.json(savedBlog)
  }
  catch(exception) {
    next(exception)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  // User should have valid token to be able delete blogs
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('decodedToken', decodedToken)
  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token is missing or invalid' })
  }

  try {
    // Blog may be deleted if request was done by the user who owns it
    const blogToBeRemoved = await Blog.findById(request.params.id)
    if (!blogToBeRemoved) {
      return  response.status(400).json({ error: 'Blog not found' })
    }
    const blogOwnersId = blogToBeRemoved.user.toString()
    if (blogOwnersId  === decodedToken.id.toString()){
      await blogToBeRemoved.remove()
      return response.status(204).end()
    }
    return response.status(401).json({ error: 'User can only delete their own blog' })

  }
  catch (exception) {
    next(exception)
  }
})


blogsRouter.put('/:id', async (request, response, next) => {
  // User should have valid token to be able delete blogs
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  console.log('decodedToken', decodedToken)
  if (!token || !decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'token is missing or invalid' })
  }
  const body = request.body
  if (!(body.title || body.author || body.url || body.likes)) {
    return response.status(400).json({ error: 'Missing a part of blog properties to update' })
  }
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(204).json(newBlog.toJSON())
  }
  catch (exception) {
    next(exception)
  }

})

module.exports = blogsRouter