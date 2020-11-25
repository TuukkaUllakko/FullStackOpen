describe('Blog app', function () {

  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Login to view blogs')
  })

  describe('Login', function () {

    it('succeeds with correct credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('Matti Luukkainen logged in')
      cy.contains('logout')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').contains('wrong username or password')
    })
  })

  describe('When logged in', function () {

    beforeEach(function () {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('test blog author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-button').click()

      cy.contains('test blog title')
      cy.get('.added').contains('a new blog \'test blog title\' by test blog author added')
    })

    it('A blog can be liked', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('test blog author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-button').click()
      cy.contains('View').click()

      cy.get('#like-button').click()
      cy.get('#likes').contains(1)
      cy.get('#like-button').click()
      cy.get('#likes').contains(2)
    })

    it('A blogs creator can also remove it', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('test blog author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-button').click()
      cy.contains('View').click()

      cy.contains('test blog title')
      cy.wait(3000)
      cy.get('#remove-button').click()
      cy.get('html').should('not.contain', 'test blog title')
    })

    it.only('Blogs are ordered by likes', function () {
      cy.contains('Add new blog').click()
      cy.get('#title').type('test blog title')
      cy.get('#author').type('test blog author')
      cy.get('#url').type('www.testurl.com')
      cy.get('#create-button').click()

      cy.contains('Add new blog').click()
      cy.get('#title').type('second blog title')
      cy.get('#author').type('second blog author')
      cy.get('#url').type('www.secondurl.com')
      cy.get('#create-button').click()
      cy.wait(3000)

      cy.contains('View').click()
      cy.get('#like-button').click()
      cy.get('#likes').contains(1) //First one on the list should now have 1 like
      cy.get('#hide-button').click()

      cy.contains('second blog title').parent().find('#view-button').as('theButton')
      cy.get('@theButton').click()

      cy.contains('second blog title').parent().find('#like-button').as('theButton')
      cy.get('@theButton').click()
      cy.get('@theButton').click()

      cy.contains('second blog title').parent().find('#hide-button').as('theButton')

      cy.get('@theButton').click()

      cy.contains('View').click() //Open the first blog on the list
      cy.get('#likes').contains(2) //First one on the list should now be the second blog with 2 likes

    })
  })

})