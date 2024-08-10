import { useState } from 'react'
import blogServices from '../services/blogs'

const handleInputChange = stateUpdater => {
  return ({ target }) => stateUpdater(target.value)
}

const TextualInput = ({ nom, state, stateUpdater }) => {
  return <div className="form-control">
    <label htmlFor={nom}>{nom}:</label>
    <input
      type="text"
      name={nom}
      id={nom}
      value={state}
      onChange={handleInputChange(stateUpdater)}
    />
  </div>
}

const BlogForm = ({ setBlogs, setOutcomeMessage, setVisibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const blogObject = { title, author, url }
      await blogServices.postBlog(blogObject)
      const newBlogList = await blogServices.getAll()
      setBlogs(newBlogList)
      setOutcomeMessage(['success', `added ${blogObject.title} by ${blogObject.author} to blog list`])
      if (setVisibility) setVisibility(false)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (error) {
      setOutcomeMessage(['failure', error.message])
    }
  }

  return <>
    <h2>Create a new entry:</h2>
    <form onSubmit={handleSubmit}>
      <TextualInput nom={'title'} state={title} stateUpdater={setTitle}/>
      <TextualInput nom={'author'} state={author} stateUpdater={setAuthor}/>
      <TextualInput nom={'url'} state={url} stateUpdater={setUrl}/>
      <button type="submit">Create</button>
    </form>
  </>
}

export default BlogForm