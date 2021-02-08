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

  const blogsAtEnd = await helper.blogsInDb()

  
  const contents = helper.blogsWithoutId(blogsAtEnd)

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
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

  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length - 1]

  expect(lastBlog.likes).toBe(0)
})

describe('HTTP-post to /api/blogs with false information, 400 BAD REQUEST', () => {
  test('without TITLE', async () => {
    const newBlog = {
      url: 'www.testing-dot.com',
      author: 'Unauthorized blogger',
      likes: 666,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('without URL', async () => {
    const newBlog = {
      title: 'Testers be testing',
      author: 'Unauthorized blogger',
      likes: 666,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })

  test('without URL and TITLE', async () => {
    const newBlog = {
      author: 'Unauthorized blogger',
      likes: 666,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})


test('Succesful deletion returns 204', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]
  console.log(blogToDelete.id)
  await api
    .delete(`/api/blog/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = helper.blogsWithoutId(blogsAtEnd)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
  expect(contents).not.toContain(blogToDelete)

})

afterAll(() => {
  mongoose.connection.close()
})