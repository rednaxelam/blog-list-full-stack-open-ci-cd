import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, setOutcomeMessage, user }) => {
  const [showDetailed, setShowDetailed] = useState(false)

  const blogStyle = {
    paddingTop: '10px',
    paddingLeft: '2px',
    border: 'solid',
    borderWidth: '1px',
    marginBottom: '5px'
  }

  const likeBlog = async () => {
    try {
      const newBlog = {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
        user: blog.user.id
      }
      await blogService.updateBlog(newBlog, blog.id)
      const newBlogList = await blogService.getAll()
      setBlogs(newBlogList)
    } catch (error) {
      setOutcomeMessage(['failure', error.message])
    }
  }

  const deleteBlog = async () => {
    try {
      if (user.username !== blog.user.username) {
        throw new Error('Unauthorized action: Only the creator of an entry may delete it')
      }
      if (window.confirm(`Permanently delete entry for ${blog.title} by ${blog.author}?`)) {
        const successMessage = `entry for ${blog.title} has been successfully deleted`
        await blogService.deleteBlog(blog.id)
        const newBlogList = await blogService.getAll()
        setBlogs(newBlogList)
        setOutcomeMessage(['success', successMessage])
      }
    } catch (error) {
      setOutcomeMessage(['failure', error.message])
    }
  }

  if (showDetailed) {
    return <div style={blogStyle} className='blog'>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(false)}>hide</button></p>
      <p>{blog.url}</p>
      <p>likes {blog.likes} <button onClick={() => likeBlog()}>like</button></p>
      <p>{blog.user.name}</p>
      { user.username === blog.user.username ? <p><button onClick={() => deleteBlog()}>remove</button></p> : null}
    </div>
  } else {
    return <div style={blogStyle} className='blog'>
      <p>{blog.title} {blog.author} <button onClick={() => setShowDetailed(true)}>view</button></p>
    </div>
  }
}

export default Blog