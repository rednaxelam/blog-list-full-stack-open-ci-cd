const Blog = require('../models/blog')

const blogObjectUpdated = {
  title: 'Blogs are good in and of themselves',
  author: 'Bob',
  url: 'Dummy URL',
  likes: 4,
}

const blogObjectSingle = {
  title: 'Luv me blogs',
  author: 'Greg',
  url: 'Dummy URL: Third Time\'s a Charm',
  likes: 53,
}

const blogObjectWithoutLikes = {
  title: 'Likes lead to tyranny of the (stupid) majority. I refuse to use them',
  author: 'Timothy',
  url: 'Dummy URL: I can\'t use punctuation properly'
}

const blogObjectWithoutURL = {
  title: 'I dislike people who don\'t enter data correctly',
  author: 'AI Machine Data Scientist (Actually Data Analyst)',
  likes: 2
}

const blogObjectWithoutTitle = {
  author: 'Luka Tim',
  url: 'Dummy URL: Another One',
  likes: 22
}

const dummyBlogObject = {
  title: 'example text',
  author: 'example text',
  url: 'example text',
  likes: 0
}

const nonExistingID = async () => {
  const blog = new Blog(dummyBlogObject)
  const returnedBlog = await blog.save()

  await Blog.findByIdAndDelete(returnedBlog._id)
  return returnedBlog._id
}

module.exports = {
  blogObjectUpdated,
  blogObjectSingle,
  blogObjectWithoutLikes,
  blogObjectWithoutURL,
  blogObjectWithoutTitle,
  dummyBlogObject,
  nonExistingID,
}