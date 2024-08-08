const listHelper = require('../utils/list_helper')
const { listWithOneBlog, blogs } = require('./list_helper_constants')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {

  test('Of empty blog list is 0', () => {
    expect(listHelper.totalLikes([])).toBe(0)
  })

  test('Of blog list with only one blog post equals likes for that blog post', () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5)
  })

  test('Of a larger blog list is calculated correctly', () => {
    expect(listHelper.totalLikes(blogs)).toBe(36)
  })

})

describe('favorite blog', () => {

  test('Of empty blog list is null', () => {
    expect(listHelper.favoriteBlog([])).toBe(null)
  })

  test('Of blog list with only one blog post is that blog post', () => {
    expect(listHelper.favoriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })

  test('Of a larger blog list returns the most liked blog post', () => {
    expect(listHelper.favoriteBlog(blogs)).toEqual(blogs[2])
  })

})

describe('most blogs', () => {

  test('Of empty blog list is null', () => {
    expect(listHelper.mostBlogs([])).toBe(null)
  })

  test('Of blog list with only one blog post is author of that blog post', () => {
    expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', blogs: 1 })
  })

  test('Of a larger blog list returns the author with the most blogs', () => {
    expect(listHelper.mostBlogs(blogs)).toEqual({ author: 'Robert C. Martin', blogs: 3 })
  })
})

describe('most likes', () => {

  test('Of empty blog list is null', () => {
    expect(listHelper.mostLikes([])).toBe(null)
  })

  test('Of blog list with only one blog post is author of that blog post', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({ author: 'Edsger W. Dijkstra', likes: 5 })
  })

  test('Of a larger blog list returns the author with the most likes', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
  })
})