const DEMO_ARTICLE_COVER = 'demo-article-cover.jpg'
import { faker } from '@faker-js/faker'

const firstUser = {
  username: '@cat_lover123',
  email: 'annachan@gmail.com',
  password: 'demonslayer123',
}

const secondUser = {
  email: 'mitsuki@gmail.com',
  password: 'demonslayer123',
}

const article = {
  min: ' 2',
  title: faker.random.words(4),
  subtitle: faker.random.words(8),
  text: faker.random.words(16),
}

const articleComment = {
  comment: 'This is my comment.',
}

beforeEach(() => {
  indexedDB.deleteDatabase('firebaseLocalStorageDb')
})

it('User should be able to interact with another user: like articles, and add comments.', () => {
  cy.visit('/')

  // Redirects to sign in page
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
  cy.findByRole('link', { name: 'Sign in' }).click()

  // First user sign in
  cy.findByLabelText('Email').type(firstUser.email)
  cy.findByLabelText('Password').type(firstUser.password)
  cy.findByRole('button', { name: 'Sign in' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully signed in into your account.').should(
      'be.visible'
    )
  })

  // Redirects to create article page
  cy.findByRole('button', { name: 'authenticated nav menu' }).click()
  cy.findByRole('link', { name: 'New article' }).click()

  // Creates an article
  cy.findByLabelText('Add cover').attachFile(DEMO_ARTICLE_COVER)
  cy.findByLabelText('Article Title').type(article.title)
  cy.findByLabelText('Read minute').type(article.min)
  cy.findByRole('button', { name: 'Add subtitle' }).click()
  cy.findByLabelText('Article subtitle').type(article.subtitle)
  cy.findByLabelText('Article text').type(article.text)
  cy.findByRole('button', { name: 'Publish' }).click()

  // Toast message
  cy.findByRole('status').within(() => {
    cy.findByText('Successfully created a blog article.').should('be.visible')
  })

  //  First user signs out
  cy.findByRole('button', { name: 'authenticated nav menu' }).click()
  cy.findByRole('link', { name: 'Sign Out' }).click()

  // Second user sign in
  cy.findByRole('button', { name: 'unauthenticated nav menu' }).click()
  cy.findByRole('link', { name: 'Sign in' }).click()
  cy.findByLabelText('Email').type(secondUser.email)
  cy.findByLabelText('Password').type(secondUser.password)
  cy.findByRole('button', { name: 'Sign in' }).click()

  // Redirects to first users profile
  cy.findByRole('button', { name: 'Users' }).click()
  cy.findByRole('link', { name: `${firstUser.username}` }).click()

  // Follows first user
  cy.findByRole('button', { name: 'Follow' }).click()

  // Redirects to first users article
  cy.findByRole('link', { name: `${article.title}` }).click()

  //   Likes and comment on first users article
  cy.findByRole('button', { name: 'Like article' }).click()
  cy.findByLabelText('Comment').type(articleComment.comment)
  cy.findByRole('button', { name: 'Post' }).click()

  // Second users signs out
  cy.findByRole('button', { name: 'authenticated nav menu' }).click()
  cy.findByRole('link', { name: 'Sign Out' }).click()
})
