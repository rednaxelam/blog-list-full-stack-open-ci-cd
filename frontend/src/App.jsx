import { useState, useEffect } from 'react'
import OutcomeMessage from './components/OutcomeMessage'
import BlogList from './components/BlogList'
import BlogForm from './components/BlogForm'
import LogInForm from './components/LogInForm'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [outcomeMessage, setOutcomeMessage] = useState(null)

  useEffect(() => {
    const savedUser = window.localStorage.getItem('loggedUser')
    if (savedUser) {
      const currentUser = JSON.parse(savedUser)
      setUser(currentUser)
      blogService.setToken(currentUser.token)
    }
  }, [])

  useEffect(() => {
    if (user) {
      blogService.getAll().then(blogs => {
        setBlogs(blogs)
      })
      blogService.setToken(user.token)
    } else {
      setBlogs([])
      blogService.removeToken()
    }
  }, [user])

  useEffect(() => {
    if (outcomeMessage) {
      setTimeout(() => setOutcomeMessage(null), 4000)
    }
  }, [outcomeMessage])

  const logOut = () => {
    setUser(null)
    window.localStorage.removeItem('loggedUser')
    setOutcomeMessage(['success', 'logged out successfully'])
  }

  const displayOutcomeMessage = () => {
    if (outcomeMessage === null) {
      return <></>
    } else {
      return <OutcomeMessage outcomeMessage={outcomeMessage} />
    }
  }

  const displayMain = () => {
    if (user === null) {
      return <>
        <h2>log in to the application</h2>
        <LogInForm setUser={setUser} setOutcomeMessage={setOutcomeMessage} />
      </>
    } else {
      return <>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={() => logOut()}>Log Out</button></p>
        <Toggleable label={'add new blog'}>
          <BlogForm setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage} />
        </Toggleable>
        <BlogList blogs={blogs} setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage} user={user} />
      </>
    }
  }

  return (
    <div>
      {displayOutcomeMessage()}
      {displayMain()}
    </div>
  )
}

export default App