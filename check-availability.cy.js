describe('check availability', () => {

  it('reschedule', () => {

    const email = Cypress.env('email')
    const pass = Cypress.env('password')
    const searchDate = Cypress.env('date')

    Cypress.on('uncaught:exception', (err, runnable) => {
      // prevents Cypress from failing the test
      return false
    })

    cy.visit('https://ais.usvisa-info.com/en-ca/niv/users/sign_in')

    // check maintenance
    cy.get('body').should('not.include.text', 'Doing Maintenance')

    // sign in
    cy.get('#sign_in_form').within(() => {
      cy.get('#user_email').type(`${email}`)
      cy.get('#user_password').type(`${pass}`)
      cy.get('div.radio-checkbox-group > label > div').click()
      cy.get('input').contains('Sign').click()
      cy.url().should('include', 'groups')
    })

    // continue to actions
    cy.get('.application .button').contains('Continue').click()
    cy.url().should('include', 'continue_actions')

    // check maintenance
    cy.get('body').should('not.include.text', 'Doing Maintenance')

    // select 'reschedule'
    cy.get('#forms li').contains('Reschedule Appointment').parent().within(() => {
      cy.root().click()
      cy.get('.small-only-expanded').click()
      cy.url().should('include', 'appointment')
    })

    // continue; intercept dates;
    cy.intercept('**/appointment/days/95.json?*').as('dates')
    cy.get('input').contains('Continue').click()
    cy.wait("@dates").its("response").then((res) => {
      expect(res.body).to.be.an("Array")
      const dates = res.body
      expect(dates, 'Dates can not be empty').to.be.not.empty
      const firstDate = dates[0]["date"]
      expect(new Date(firstDate), 'This date is too late: ' + firstDate).to.be.lte(new Date(searchDate))
    });

  })
})
