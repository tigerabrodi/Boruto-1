import { faker } from '@faker-js/faker'

const DEMO_AVATAR = 'demo-avatar.jpg'

const user = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: 'demonslayer123',
  fullName: faker.name.fullName(),
  age: '21',
  location: 'Tokyo, Japan',
  bio: faker.random.words(7),
}

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
})

it('Sign up and create an account', () => {
  cy.visit('/')

  cy.findByRole('link', { name: 'Home' }).should('be.visible')

  // Redirects to sign up page
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
  cy.findByRole('link', { name: 'Sign up' }).click()

  // User signs up
  cy.findByLabelText('Username').type(user.username)
  cy.findByLabelText('Email').type(user.email)
  cy.findByLabelText('Password').type(user.password)
  cy.findByLabelText('Confirm Password').type(user.password)
  cy.findByRole('button', { name: 'Sign up' }).click()

  //  User creates account
  cy.findByRole('heading', { level: 1, name: 'Create your account' }).should(
    'be.visible'
  )
  cy.findByLabelText('Choose File').attachFile(DEMO_AVATAR)
  cy.findByLabelText('Full Name *').type(user.fullName)
  cy.findByLabelText('Age *').type(user.age)
  cy.findByLabelText('Location *').type(user.location)
  cy.findByLabelText('Biography').type(user.bio)
  cy.findByRole('button', { name: 'Done' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully created your account.').should('be.visible')
  })
})
