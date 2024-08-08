require('dotenv').config()

const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const TEST_TOKEN_MLUUKKAI = process.env.TEST_TOKEN_MLUUKKAI

const TEST_TOKEN_BARRY53 = process.env.TEST_TOKEN_BARRY53

module.exports = {
  MONGODB_URI,
  PORT,
  TEST_TOKEN_MLUUKKAI,
  TEST_TOKEN_BARRY53,
}