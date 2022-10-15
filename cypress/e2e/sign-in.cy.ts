const user = {
  email: 'annachan@gmail.com',
  password: 'demonslayer123',
}

// Remove cache before running test so that we don't end up being already signed in since we signed in, in the previous test.
beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
})

it('Should sign user in', () => {
  cy.visit('/')

  // Redirects to sign in page
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
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
})
