import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup, fireEvent } from '@testing-library/react'
// import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
// import Togglable from './Togglable'

afterEach(cleanup)
describe.only('<Blog />', () => {
  let component
  let mockHandler

  beforeEach(() => {
    const blog = {
      title: 'title1',
      author: 'author1',
      url: 'url1',
      user: '123456',
      likes: 1
    }
    const user = {
      username: 'moi'
    }

    let setUpdate

    mockHandler = jest.fn()
    component = render(
      <Blog
        blog={blog}
        setUpdate={setUpdate}
        user={user}
        onClick={mockHandler}
      />
    )
  })

  it('renders its title', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('title1')
  })

  it('renders its author', () => {
    const div = component.container.querySelector('.titleauthor')

    expect(div).toHaveTextContent('author1')
  })

  it('at start url, likes are not shown', () => {
    const div = component.container.querySelector('.open')

    expect(div).toHaveStyle('display: none')
  })

  it('after clicking the button toggled contents show', () => {
    const btn = component.container.querySelector('.toggle')
    fireEvent(btn)

    const div = component.container.querySelector('.open')
    expect(div).not.toHaveStyle('display: none')
  })

  // it('click shows more', () => {
  //   const button = component.getByText('titteli authori')
  //   fireEvent.click(button)
  //   const div = component.container.querySelector('.titleauthorlikedelete')

  //   expect(div).toHaveTextContent(
  //     'titteli urli 1 likeslikeadded by authoriremove'
  //   )
  // })

  // component.debug()
})