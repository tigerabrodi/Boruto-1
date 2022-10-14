it('Should sign user out', () => {
  cy.visit('/')

  // User signs out
  cy.findByRole('button', { name: 'authenticated nav menu button' }).click()

  cy.findByRole('link', { name: 'Sign Out' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully signed out of your account.').should(
      'be.visible'
    )
  })
})
