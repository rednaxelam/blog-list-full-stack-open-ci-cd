const User = require('../models/user')

// The following variable is to be used in initializing the database
const databaseUserObjectArray = [
  {
    username: 'mluukkai',
    passwordHash: '$2b$10$KyoWE2.doRfkhYTZ51AKe.MIsrPNKZHesHp0EEPF7l0GkazNJXCuO',
    name: 'Bob'
  },
  {
    username: 'barry53',
    passwordHash: '$2b$10$oUYCQgOxumps2Y1WwZaBC.NBhhavmNWWw7SlYz4DWqFdoNClAyUV2',
    name: 'Barry'
  },
]


const invalidUsers = {
  missingUsername: {
    password: 'hello',
    name: 'there'
  },
  missingPassword: {
    username: 'AAAAAGGGGHHHHH',
    name: 'pain'
  },
  invalidUsername: {
    username: '12',
    password: '123',
    name: '1234'
  },
  invalidPassword: {
    username: '123',
    password: '12',
    name:'1234'
  },
  alreadyExistingUser: {
    username: 'barry53',
    password: 'pies',
    name: 'Barry'
  }
}

const validUser = {
  username: 'tim57',
  password: 'cruise',
  name: 'Tim'
}

module.exports = { databaseUserObjectArray, invalidUsers, validUser }