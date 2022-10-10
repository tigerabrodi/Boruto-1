it('Should sign user out', () => {
  cy.visit('/')

  // Unauthenticated navigation actions are not visible
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).should(
    'not.exist'
  )

  // User signs out
  cy.findByRole('button', { name: 'authenticated nav menu' })
    .should('be.visible')
    .click()

  cy.findByRole('link', { name: 'Sign Out' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully signed out of your account.').should(
      'be.visible'
    )
  })
})
