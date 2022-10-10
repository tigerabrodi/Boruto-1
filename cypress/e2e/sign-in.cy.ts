const user = {
  email: 'annachan@gmail.com',
  password: 'demonslayer123',
}
it('Should sign user in', () => {
  cy.visit('/')

  // Authenticated navigation actions are not visible
  cy.findByRole('button', { name: 'authenticated nav menu' }).should(
    'not.exist'
  )

  // Redirects to sign in page
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
  cy.findByRole('nav', { name: 'unauthenticated menu' }).should('be.visible')
  cy.findByRole('link', { name: 'Sign in' }).click()

  // Users sign in
  cy.findByLabelText('Email').type(user.email)
  cy.findByLabelText('Password').type(user.password)
  cy.findByRole('button', { name: 'Sign in' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully signed in into your account.').should(
      'be.visible'
    )
  })

  // Authenticated nav button should exist
  cy.findByRole('button', { name: 'authenticated nav menu' }).should('exist')
})
