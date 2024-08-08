const dummy = blogs => {
  return 1
}

const totalLikes = blogList => {
  return blogList.reduce(
    (totalLikes, blogPost) => totalLikes + blogPost.likes,
    0
  )
}

const favoriteBlog = blogList => {
  if (blogList.length === 0) return null
  else if (blogList.length === 1) return blogList[0]
  else return blogList.reduce(
    (mostLikedBlog, currentBlog) => mostLikedBlog.likes < currentBlog.likes ? currentBlog : mostLikedBlog
  )
}

const mostBlogs = blogList => {
  if (blogList.length === 0) return null
  else if (blogList.length === 1) return { author: blogList[0].author, blogs: 1 }
  else {
    const numBlogs = {}
    let authorWithMostBlogs = blogList[0].author
    let mostBlogs = 1

    blogList.forEach(blog => {
      if (Object.hasOwn(numBlogs, blog.author)) {
        numBlogs[blog.author]++
        if (numBlogs[blog.author] > mostBlogs) {
          authorWithMostBlogs = blog.author
          mostBlogs++
        }
      } else {
        numBlogs[blog.author] = 1
      }
    })

    return {
      author: authorWithMostBlogs,
      blogs: mostBlogs
    }
  }
}

const mostLikes = blogList => {
  if (blogList.length === 0) return null
  else if (blogList.length === 1) return { author: blogList[0].author, likes: blogList[0].likes }
  else {
    const numLikes = {}
    let authorWithMostLikes = blogList[0].author
    let mostLikes = blogList[0].likes

    blogList.forEach(blog => {
      if (Object.hasOwn(numLikes, blog.author)) {
        numLikes[blog.author] += blog.likes
        if (numLikes[blog.author] > mostLikes) {
          authorWithMostLikes = blog.author
          mostLikes = numLikes[blog.author]
        }
      } else {
        numLikes[blog.author] = blog.likes
      }
    })

    return {
      author: authorWithMostLikes,
      likes: mostLikes
    }
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}