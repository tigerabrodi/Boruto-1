import { faker } from '@faker-js/faker'

const DEMO_AVATAR = 'demo-avatar.jpg'

const newUser = {
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  fullName: faker.name.fullName(),
  age: '21',
  location: 'Tokyo, Japan',
  bio: faker.random.words(7),
}

it('Sign up and create an account', () => {
  cy.visit('/')

  cy.findByRole('link', { name: 'Home' }).should('be.visible')
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).should(
    'be.visible'
  )

  // Authenticated navigation actions are not visible
  cy.findByRole('button', { name: 'authenticated nav menu' }).should(
    'not.exist'
  )

  // Redirected to "sign up" page
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
})
