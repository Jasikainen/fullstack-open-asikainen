/* eslint-disable no-undef */
/*

*/
describe('Blog application', function() {
  beforeEach(function() {
    // Reset database on before each test
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    // Create user for test cases
    const user = {
      name: 'jasim',
      username: 'jasim',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login').click()
    cy.contains('Welcome to use the blog application')
  })

  describe('LOGIN', function() {
    beforeEach(function() {
      cy.contains('login').click()
    })

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('jasim')
      cy.get('#password').type('sekret')
      cy.get('#login-btn').click()
      cy.contains('jasim logged in')
    })

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('jasim')
      cy.get('#password').type('wrongsekret')
      cy.get('#login-btn').click()
      cy.get('.error')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jasim', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.contains('Create').click()
      cy.createBlog({
        title: 'title of blog',
        author: 'author of blog',
        url: 'www.blog-url.com',
      })
      cy.contains('title of blog')
    })

    it('A blog can be liked after initialization', function() {
      cy.contains('Create').click()
      cy.createBlog({
        title: 'title of blog',
        author: 'author of blog',
        url: 'www.blog-url.com',
      })
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('likes: 1')
    })

    it('A blog can be deleted by user its created by', function() {
      cy.contains('Create').click()
      cy.createBlog({
        title: 'title of blog',
        author: 'author of blog',
        url: 'www.blog-url.com',
      })
      // Open the statistics of blog and delete it
      cy.contains('View').click()
      cy.get('#delete-btn').click()
    })

    it.only('Multiple blogs are sorted by likes', function() {
      cy.contains('Create').click()

      cy.createBlog({ title: 'first blog', author: 'first author', url: 'www.blog-1-url.com', likes:123 })
      cy.createBlog({ title: 'second blog', author: 'second author', url: 'www.blog-2-url.com', likes:1  })
      cy.createBlog({ title: 'third blog', author: 'third author', url: 'www.blog-3-url.com', likes:662  })

      cy.contains('first blog - first author').contains('View').click()
      cy.contains('second blog - second author').contains('View').click()
      cy.contains('third blog - third author').contains('View').click()

      cy.get('.extendedView:first')
        .as('mostLikes')
      cy.get('.extendedView:last')
        .as('leastLikes')

      cy.get('@mostLikes').contains('likes: 662')
      cy.get('@leastLikes').contains('likes: 1')
    })
  })
})