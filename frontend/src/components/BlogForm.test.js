import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('On submit, the form posts a correctly structured blog object', async () => {
  const setBlogs = jest.fn()
  const setOutcomeMessage = jest.fn()
  const setVisibility = jest.fn()

  const blogForm = render(
    <BlogForm setBlogs={setBlogs} setOutcomeMessage={setOutcomeMessage} setVisibility={setVisibility} />
  ).container

  const user = userEvent.setup()

  await user.type(screen.getByLabelText('title:'), 'abc')
  await user.type(blogForm.querySelector('#author'), 'xyz')
  await user.type(blogForm.querySelector('#url'), '123')

  await user.click(screen.getByText('Create'))

  expect(setBlogs.mock.calls[0][0]).toEqual({ title: 'abc', author: 'xyz', url: '123' })
})