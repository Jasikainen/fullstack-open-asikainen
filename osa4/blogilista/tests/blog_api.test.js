const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_api_test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  // Clear DB on each test
  await Blog.deleteMany({})
  // Add initial blogs to DB
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  const response = await api.get('/api/blogs')
  expect(response.statusCode).toBe(200)
  expect(response.type).toBe('application/json')
})


test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length)
})


test('blogs identifier is as parameter "id"', async () => {
  const response = await api.get('/api/blogs')

  const identifiers = response.body.map(n => n.id)
  expect(identifiers).toBeDefined()
})


test('note with proper content is added to database', async () => {
  const newBlog = helper.oneBlog

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogPostsAtEnd = await helper.blogsInDb()

  // Copy everything else but 'id' from the objects returned
  const contents = blogPostsAtEnd.map(blog => {
    const clone = (({ id, ...object }) => object)(blog)
    return clone
  })

  expect(blogPostsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  expect(contents).toContainEqual(newBlog)
})

test('blog post with undefined amount of likes should be 0', async () => {
  const undefinedLikesBlog = helper.oneBlog
  undefinedLikesBlog.title = 'blog post about undefined likes'
  undefinedLikesBlog.likes = undefined

  await api
    .post('/api/blogs')
    .send(undefinedLikesBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogPostsAtEnd = await helper.blogsInDb()
  const lastBlog = blogPostsAtEnd[blogPostsAtEnd.length - 1]

  expect(lastBlog.likes).toBe(0)
})


afterAll(() => {
  mongoose.connection.close()
})