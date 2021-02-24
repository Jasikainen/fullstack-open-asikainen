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

})