const supertest = require('supertest')
const User = require('../models/user')
const mongoose = require('mongoose')
const config = require('../utils/config')
const app = require('../app')
const helper = require('./users_api_test_helper')

mongoose.connect(config.MONGODB_URI)

const api = supertest(app)

const getUserList = async () => {
  const userList = await User.find({})
  userList.forEach((note, index) => {
    userList[index] = note.toJSON()
  })
  return userList
}

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.databaseUserObjectArray)
})

describe('User Creation', () => {
  test('Valid POST to /api/users leads to creation of a new user', async () => {
    const beforeUserList = await getUserList()

    const newUser = await api
      .post('/api/users')
      .send(helper.validUser)
      .expect(201)

    const afterUserList = await getUserList()

    expect(newUser.body.username).toBe(afterUserList[afterUserList.length - 1].username)
    expect(helper.validUser.username).toBe(afterUserList[afterUserList.length - 1].username)
    expect(afterUserList).toHaveLength(beforeUserList.length + 1)
  })
  test('Invalid POST request leads to a 400 with error message', async () => {
    for (let invalidUser in helper.invalidUsers) {
      let error = await api
        .post('/api/users')
        .send(helper.invalidUsers[invalidUser])
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(error.body.error).toBeDefined()
    }
  })
})

afterAll( async () => {
  await mongoose.connection.close()
})