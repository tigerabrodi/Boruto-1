const DEMO_ARTICLE_COVER = 'demo-article-cover.jpg'

const article = {
  min: '2',
  title: 'What is Lorem Ipsum?',
  subtitle:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
  text: `Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
}

it('Should create an article', () => {
  cy.visit('/')

  // Authenticated navigation actions are not visible
  cy.findByRole('button', { name: 'uauthenticated nav menu' }).should(
    'not.exist'
  )

  // Redirects to sign in page
  cy.findByRole('button', { name: 'authenticated nav menu' }).click()
  cy.findByRole('nav', { name: 'authenticated menu' }).should('be.visible')
  cy.findByRole('link', { name: 'New Article' }).click()

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
})
