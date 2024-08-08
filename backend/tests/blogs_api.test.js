// Make sure that the user ids (for blogObjectArray) and tokens are correct before running the tests. Running user api test will mean
// they need to be updated for the tests to work

// Is there a better way? I'm sure there is, but I'm not implementing it right now

const config = require('../utils/config')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const { blogObjectArray,
  blogObjectSingle,
  blogObjectUpdated,
  blogObjectWithoutLikes,
  blogObjectWithoutTitle,
  blogObjectWithoutURL,
  dummyBlogObject,
  nonExistingID, } = require('./blogs_api_test_helper')

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

const api = supertest(app)

const getBlogList = async () => {
  const returnedBlogListPromise = await api.get('/api/blogs')
  return returnedBlogListPromise.body
}

beforeEach( async () => {
  await Blog.deleteMany({})

  for (let blogObject of blogObjectArray) {
    let blog = new Blog(blogObject)
    await blog.save()
  }
})

test('Get request to /api/blogs will return all elements of the collection', async () => {
  let returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  for (let i = 0; i < returnedBlogList.length; i++) {
    let returnedBlog = returnedBlogList[i]
    let originalBlog = blogObjectArray[i]
    expect(returnedBlog).toHaveProperty('url')
    expect(returnedBlog['url']).toBe(originalBlog['url'])
  }
})

test('Returned blogs have a property named "id"', async () => {
  const returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  for (let i = 0; i < returnedBlogList.length; i++) {
    expect(returnedBlogList[i].id).toBeDefined()
  }
})

test('Well formed Post request to /api/blogs will successfully create a new blog post', async () => {
  const returnedBlogPromise = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${config.TEST_TOKEN_MLUUKKAI}`)
    .send(blogObjectSingle)

  const returnedBlog = returnedBlogPromise.body

  for (let prop in blogObjectSingle) {
    expect(returnedBlog).toHaveProperty(prop)
    // an assumption is made here that the schema only specifies non-object values
    expect(returnedBlog[prop]).toBe(blogObjectSingle[prop])
  }

  expect(returnedBlog.id).toBeDefined()
  expect(returnedBlog._id).toBeUndefined()
  expect(returnedBlog.__v).toBeUndefined()

  let returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body
  expect(returnedBlogList).toHaveLength(blogObjectArray.length + 1)
})

test('If the likes property is missing from a post request, it will default to 0', async () => {
  const returnedBlogPromise = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${config.TEST_TOKEN_BARRY53}`)
    .send(blogObjectWithoutLikes)
  const returnedBlog = returnedBlogPromise.body

  expect(returnedBlog.likes).toBe(0)
})

test('If the title or url property is missing from the post request data, there will be a 400 response', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${config.TEST_TOKEN_MLUUKKAI}`)
    .send(blogObjectWithoutTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${config.TEST_TOKEN_BARRY53}`)
    .send(blogObjectWithoutURL)
    .expect(400)

  const returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  expect(returnedBlogList).toHaveLength(blogObjectArray.length)
})

test('POST request with no token fails with 401 response', async () => {
  await api
    .post('/api/blogs')
    .send(blogObjectWithoutTitle)
    .expect(401)

  const returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  expect(returnedBlogList).toHaveLength(blogObjectArray.length)
})

test('POST request with invalid token fails with 401 response', async () => {
  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer 1${config.TEST_TOKEN_BARRY53}`)
    .send(blogObjectWithoutTitle)
    .expect(401)

  const returnedBlogListPromise = await api.get('/api/blogs')
  const returnedBlogList = returnedBlogListPromise.body

  expect(returnedBlogList).toHaveLength(blogObjectArray.length)
})

describe('blog deletion', () => {
  test('Delete request with document id removes document from database and returns 204', async () => {
    const beforeReturnedBlogListPromise = await api.get('/api/blogs')
    const beforeReturnedBlogList = beforeReturnedBlogListPromise.body
    const returnedBlogToDelete = beforeReturnedBlogList[0]
    console.log(returnedBlogToDelete)
    await api
      .delete(`/api/blogs/${returnedBlogToDelete.id}`)
      .set('Authorization', `Bearer ${config.TEST_TOKEN_MLUUKKAI}`)
      .expect(204)

    const afterReturnedBlogListPromise = await api.get('/api/blogs')
    const afterReturnedBlogList = afterReturnedBlogListPromise.body

    expect(afterReturnedBlogList).toHaveLength(beforeReturnedBlogList.length - 1)
    expect(afterReturnedBlogList.map(blog => blog.id)).not.toContain(returnedBlogToDelete.id)
  })
  test('Delete request for nonexistent document removes nothing and returns 204', async () => {
    const beforeReturnedBlogListPromise = await api.get('/api/blogs')
    const beforeBlogList = beforeReturnedBlogListPromise.body

    const nonexistentID = await nonExistingID()

    await api
      .delete(`/api/blogs/${nonexistentID}`)
      .set('Authorization', `Bearer ${config.TEST_TOKEN_BARRY53}`)
      .expect(204)

    const afterReturnedBlogListPromise = await api.get('/api/blogs')
    const afterBlogList = afterReturnedBlogListPromise.body

    expect(beforeBlogList).toHaveLength(afterBlogList.length)
  })
})

describe('blog modification', () => {
  test('Valid PUT request updates blog', async () => {
    const beforeBlogList = await getBlogList()

    const updatedBlogPostPromise = await api
      .put(`/api/blogs/${beforeBlogList[0].id}`)
      .send(blogObjectUpdated)
      .expect(200)

    const afterBlogList = await getBlogList()

    expect(beforeBlogList).toHaveLength(afterBlogList.length)
    expect(beforeBlogList[0].likes).not.toEqual(updatedBlogPostPromise.body.likes)
    expect(afterBlogList[0].likes).toEqual(updatedBlogPostPromise.body.likes)
  })
  test('PUT request with invalid body returns a 400 response', async () => {
    const beforeBlogList = await getBlogList()

    await api
      .put(`/api/blogs/${beforeBlogList[0].id}`)
      .send(blogObjectWithoutTitle)
      .expect(400)

    await api
      .put(`/api/blogs/${beforeBlogList[0].id}`)
      .send(blogObjectWithoutURL)
      .expect(400)
  })
  test('PUT request for nonexistent object returns a 404 response', async () => {
    const nonexistentID = await nonExistingID()

    await api
      .put(`/api/blogs/${nonexistentID.toString()}`)
      .send(dummyBlogObject)
      .expect(404)


  })
})

afterAll( async () => {
  await mongoose.connection.close()
})