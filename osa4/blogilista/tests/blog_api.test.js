const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const helper = require('./blog_api_test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const globalVariables = {} // Tokens are saved here

beforeEach(async () => {
  // Clear DB on each test
  await Blog.deleteMany({})
  await User.deleteMany({})

  // Add initial users to DB
  await User.insertMany(helper.initialUsers)
  // Use the first user as user for tests
  const users = await helper.usersInDb()
  const masterUser = {
    username: users[0].username,
    id: users[0].id,
  }

  // Add initial blogs to DB with masterUser as user
  await Blog.insertMany(helper.blogsWithMasterUser(masterUser.id))

  const faultyUser = {
    username: users[1].username,
    id: users[1].id,
  }

  // Generate two tokens of which one is working and not
  const properToken = jwt.sign(masterUser, process.env.SECRET)
  const faultyToken = jwt.sign(faultyUser, process.env.SECRET)

  globalVariables.token = `bearer ${properToken}`
  globalVariables.faultyToken = `bearer ${faultyToken}1`
})

describe('blog_api_tests', () => {
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


  test('note with proper content and token is added', async () => {
    const newBlog = helper.oneBlog

    await api
      .post('/api/blogs')
      .set('Authorization', globalVariables.token)
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = helper.blogsWithoutId(blogsAtEnd)

    expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
    expect(contents).toContainEqual(newBlog)
  })

  test('note without proper token returns 401 unauthenticated', async () => {
    const newBlog = helper.oneBlog

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer asdhfgasdcvbsfdfghsdfsdg')
      .set('Content-Type', 'application/json')
      .send(newBlog)
      .expect(401)

  })

  test('blog post with undefined amount of likes should be 0', async () => {
    const undefinedLikesBlog = helper.oneBlog
    undefinedLikesBlog.title = 'blog post about undefined likes'
    undefinedLikesBlog.likes = undefined

    await api
      .post('/api/blogs')
      .set('Authorization', globalVariables.token)
      .set('Content-Type', 'application/json')
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
      // No need for user auth token
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
      // No need for user auth token
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

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', globalVariables.token)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    const contents = helper.blogsWithoutId(blogsAtEnd)

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)
    expect(contents).not.toContain(blogToDelete)
  })
})

afterAll(() => {
  mongoose.connection.close()
})