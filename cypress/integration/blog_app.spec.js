
describe('Blog App', () => {
  it('front page can be open', () => {
    cy.visit('http://localhost:3000')
    cy.contains('Blogs')
    cy.contains('Memorization Tips by Ahmad Ade')
  })
})