const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const userFound = await User.findOne({ username: body.username })
  // Check whether the user exists in database
  const isPasswordValid =
    userFound === null
      ? false
      : await bcrypt.compare(body.password, userFound.passwordHash)

  if (!(userFound && isPasswordValid)) {
    return response.status(401).json({
      error: 'invalid username or password. Please try again.',
    })
  }

  // generate token for found user
  const userForToken = {
    username: userFound.username,
    id: userFound._id,
  }
  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: userFound.username, name: userFound.name })
})

module.exports = loginRouter
