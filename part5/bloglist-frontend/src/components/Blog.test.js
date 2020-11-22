import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
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
    <Blog blog={blog} user={user}/>
  )

  const div = component.container.querySelector('.notShown')
  expect(div).toHaveTextContent(blog.title)
  expect(div).toHaveTextContent(blog.author)
  expect(div).not.toHaveTextContent(blog.url)
  expect(div).not.toHaveTextContent(blog.likes)
  expect(div).not.toHaveTextContent(blog.user)

})