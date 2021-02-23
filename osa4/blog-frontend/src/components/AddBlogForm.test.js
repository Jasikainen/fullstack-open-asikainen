import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import AddBlogForm from './AddBlogForm'

test('<AddBlogForm /> updates parent state and calls onSubmit', () => {
  const addBlog = jest.fn()
  const notificationMessageHandler = jest.fn()
  const component = render(
    <AddBlogForm addBlog={addBlog} notificationMessageHandler={notificationMessageHandler}/>
  )

  const blogAuthor = component.container.querySelector('#blogAuthor')
  const blogTitle = component.container.querySelector('#blogTitle')
  const blogUrl = component.container.querySelector('#blogUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(blogAuthor, {
    target: { value: 'Test author' }
  })
  console.log(prettyDOM(blogAuthor))

  fireEvent.change(blogTitle, {
    target: { value: 'Test title' }
  })
  console.log(prettyDOM(blogTitle))

  fireEvent.change(blogUrl, {
    target: { value: 'www.testing-url.com' }
  })
  console.log(prettyDOM(blogUrl))

  fireEvent.submit(form)

  expect(addBlog.mock.calls).toHaveLength(1)
  expect(notificationMessageHandler.mock.calls).toHaveLength(1)

  expect(addBlog).toHaveBeenCalledWith({
    title: 'Test title',
    author: 'Test author',
    url: 'www.testing-url.com'
  })
})