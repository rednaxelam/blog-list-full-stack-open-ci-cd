const jwt = require('jsonwebtoken')
const User = require('../models/user')
const loginRouter = require('express').Router()
const bcrypt = require('bcrypt')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const userInDB = await User.findOne({ username })

  if (!userInDB) {
    response.status(401).json({ error: 'user does not exist' })
    return
  }

  const passwordCorrect = await bcrypt.compare(password, userInDB.passwordHash)


  if (!passwordCorrect) {
    response.status(401).json({ error: 'password incorrect' })
  }

  const userForToken = {
    username: userInDB.username,
    id: userInDB._id
  }

  const token = await jwt.sign(userForToken, process.env.SECRET)

  response.status(200).send({ token, username: userInDB.username, name: userInDB.name })
})

module.exports = loginRouter