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

afterAll(() => {
  mongoose.connection.close()
})