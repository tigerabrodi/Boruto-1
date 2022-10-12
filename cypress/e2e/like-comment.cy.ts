const comment = 'This is my comment 😊'

it('Should like and comment on an article', () => {
  cy.visit('/')

  // Redirects to article
  cy.findByRole('link', { name: 'Go to article' }).eq(0).click()

  // Like and comment
  cy.findByRole('button', { name: 'Like article' }).click()
  cy.findByLabelText('Comment').type(comment)
  cy.findByRole('button', { name: 'Post' }).click()
})
