import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

test('BlogForm calls the event handler it received as props with the right details when a new blog is created', () => {

  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'is title correct' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'is author correct' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'is url correct' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('is title correct')
  expect(createBlog.mock.calls[0][0].author).toBe('is author correct')
  expect(createBlog.mock.calls[0][0].url).toBe('is url correct')
})