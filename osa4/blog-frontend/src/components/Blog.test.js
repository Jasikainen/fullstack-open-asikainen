import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'

import Blog from './Blog'

describe('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'Testing react app is critical',
      author: 'Tester author',
      url: 'www.testing.com',
      user: 'asd3dfgcvb12',
      likes: 123
    }

    mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        addLike={mockHandler}
      />
    )
  })

  // 5.13 Tests
  test('should display title as default', async () => {
    const div = component.container.querySelector('.defaultView')
    expect(div).toHaveTextContent('Testing react app is critical')
    expect(div).not.toHaveStyle('display: none')

  })
  test('should display author as default', async () => {
    const div = component.container.querySelector('.defaultView')
    expect(div).toHaveTextContent('Tester author')
    expect(div).not.toHaveStyle('display: none')
  })

  // 5.14 Test
  test('should display author, title, url and likes after clicking "View"', () => {
    const button = component.getByText('View')
    fireEvent.click(button)
    const div = component.container.querySelector('.extendedView')

    expect(div).not.toHaveStyle('display: none')
    expect(div).toHaveTextContent(
      'Testing react app is critical'
    )
    expect(div).toHaveTextContent(
      'Tester author'
    )
    expect(div).toHaveTextContent(
      'www.testing.com'
    )
    expect(div).toHaveTextContent(
      '123'
    )
  })
  // I dont have the "event handler" function passed as props but I do have
  // function AddLikes that handles the update of likes to backend
  test('likes should increase by two after pressing "Like" twice ', () => {
    const button = component.getByText('Like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})