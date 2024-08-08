import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const renderBlog = () => {
  const user = { username: 'example', name: 'xmpl', token: 'tokenUser1' }
  const blogDetails = {
    title: 'abc',
    author: '123',
    id: 'idblog1',
    likes: 567,
    url: 'xyz',
    user: { username: 'example', name: 'xmpl', id: 'idUser1' }
  }
  const setBlogs = jest.fn()
  const setOutcomeMessage = jest.fn()

  render(
    <Blog user={user} blog={blogDetails} setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage}/>
  )
}

test('By default, Blog component renders just the title and author of the blog', () => {
  renderBlog()

  screen.getByText('abc', { exact: false })
  screen.getByText('123', { exact: false })
  expect(screen.queryByText('567', { exact: false })).toBeNull()
  expect(screen.queryByText('xyz', { exact: false })).toBeNull()

})

test('URL and likes are shown when button to show details is clicked', async () => {
  renderBlog()

  const user = userEvent.setup()
  const showDetailsButton = screen.getByText('view')
  await user.click(showDetailsButton)

  screen.getByText('567', { exact: false })
  screen.getByText('xyz', { exact: false })
})

test('If the like button is clicked twice, the corresponding event handler is called twice', async () => {
  const userDetails = { username: 'example', name: 'xmpl', token: 'tokenUser1' }
  const blogDetails = {
    title: 'abc',
    author: '123',
    id: 'idblog1',
    likes: 567,
    url: 'xyz',
    user: { username: 'example', name: 'xmpl', id: 'idUser1' }
  }
  const setBlogs = jest.fn()
  const setOutcomeMessage = jest.fn()

  render(
    <Blog user={userDetails} blog={blogDetails} setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage}/>
  )

  const user = userEvent.setup()
  const showDetailsButton = screen.getByText('view')
  await user.click(showDetailsButton)

  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(setBlogs.mock.calls).toHaveLength(2)
})