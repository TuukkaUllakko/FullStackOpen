import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

test('renders title and author but not url and likes', () => {
  const user = {
    username: 'Kalervo Luumu',
    password: 'kalervopassword'
  }

  const blog = {
    title: 'Component testing',
    author: 'Keke Puro',
    url: 'www.kekenblogit.fi',
    likes: 7,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.notShown')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.user)

})

test('clicking the view button shows url and likes too', () => {

  const user = {
    username: 'Kalervo Luumu',
    password: 'kalervopassword'
  }

  const blog = {
    title: 'Component testing',
    author: 'Keke Puro',
    url: 'www.kekenblogit.fi',
    likes: 7,
    user: user
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  let div = component.container.querySelector('.notShown')
  let div2 = component.container.querySelector('.shown')

  expect(div).not.toHaveStyle('display: none')
  expect(div2).toHaveStyle('display: none')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.user)

  const button = component.getByText('View')

  fireEvent.click(button)

  expect(div).toHaveStyle('display: none')
  expect(div2).not.toHaveStyle('display: none')
  expect(div2).toHaveTextContent(blog.title)
  expect(div2).toHaveTextContent(blog.url)
  expect(div2).toHaveTextContent(blog.likes)
})

test('event handler is called twice with two like button clicks', () => {

  const user = {
    username: 'Kalervo Luumu',
    password: 'kalervopassword'
  }

  const blog = {
    title: 'Component testing',
    author: 'Keke Puro',
    url: 'www.kekenblogit.fi',
    likes: 7,
    user: user
  }

  const mockHandler = jest.fn()
  const component = render(
    <Blog blog={blog} user={user} updateBlog={mockHandler} />
  )

  const button = component.getByText('Like!')

  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
