
describe('Blog App', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Yunus Ishola',
      username: 'dhulnoon',
      password: 'qwerty12'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('log in')
  })
  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.contains('log in').click()
      cy.get('#username').type('dhulnoon')
      cy.get('#password').type('qwerty12')
      cy.get('#login-button').click()

      cy.contains('Yunus Ishola logged in')
    })
    it.only('fails with wrong username or password', function() {
      cy.contains('log in').click()
      cy.get('#username').type('darwin')
      cy.get('#password').type('assjlka')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
      cy.get('#notificationMsg').should('have.css', 'border-color', 'rgb(200, 10, 10)')
    })
  })
})