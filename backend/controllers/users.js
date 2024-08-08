const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, password, name } = req.body

  if (!username || !password) {
    res.status(400).send({ error: 'missing username or password' })
    return
  } else if (username.length < 3) {
    res.status(400).send({ error: 'username must be at least 3 characters long' })
    return
  } else if (password.length < 3) {
    res.status(400).send({ error: 'password must be at least 3 characters long' })
    return
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = new User({
    username,
    passwordHash,
    name
  })

  const returnedUser = await user.save()

  res.status(201).json(returnedUser)
})

usersRouter.get('/', async (req, res) => {
  const userList = await User.find({}).populate('blogs', { user: 0, likes: 0 })

  res.json(userList)
})

module.exports = usersRouter