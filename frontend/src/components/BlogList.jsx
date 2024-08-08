import Blog from './Blog'

const BlogList = ({ blogs, setBlogs, setOutcomeMessage, user }) => {
  return (
    <div>
      { blogs.toSorted((blog1, blog2) => blog2.likes - blog1.likes).map(blog => <Blog
        key={blog.id}
        blog={blog}
        setBlogs={setBlogs}
        setOutcomeMessage={setOutcomeMessage}
        user={user}
      />) }
    </div>
  )
}

export default BlogList