const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./blog_api_test_helper') // Same helper for back end in this exercise
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
  const user = new User({ username: 'Jasim', password: 'sekret' })
  await user.save()
})

describe('Initialise database with one user "Jasim"', () => {
  test('Add user "1337Hax0r" to database', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '1337Hax0r',
      name: 'Ebin viljami',
      password: 'haxor',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map((u) => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'Jasim',
      name: 'Impostor Jasim',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('Creation fails when users short is too short, <3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '1337Hax0r',
      name: 'Impostor viljami',
      password: 'ja',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Password must be longer than 3 characters',
    )

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
