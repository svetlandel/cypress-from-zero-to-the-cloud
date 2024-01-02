
//import { submit_form } from '.cypress/support/commands'

describe('TAT Customer Service Center', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('checks the application title', () => {
    cy.title().should('eq', 'TAT Customer Service Center')
  })

  it('fills in the required fields and submits the form', () => { 
    const longText = Cypress._.repeat('qwertyuiop[asdfghjkl;zxcvbnm', 10)
    cy.get('input[name="firstName"]').type('Lana')
    cy.get('input[name="lastName"]').type('Taran')
      cy.get('input[id="email"]').type('lana@testing.com')
      cy.get('textarea').type(longText, { delay: 0 })
      cy.contains('button', 'Send').click()
      cy.get('span[class="success"]').should('be.visible')
  })
  it('displays an error message when submitting the form with an email with invalid formatting', () => { 
    cy.get('input[name="firstName"]').type('Lana')
    cy.get('input[name="lastName"]').type('Taran')
      cy.get('input[id="email"]').type('lana')
      cy.get('textarea').type('testing')
      cy.contains('button', 'Send').click()
      cy.get('span[class="error"]').should('be.visible')
  })
  it('verify that the phone field accepts only numbers', () => { 
    cy.get('input[name="firstName"]').type('Lana')
    cy.get('input[name="lastName"]').type('Taran')
      cy.get('input[id="email"]').type('lana')
      cy.get('textarea').type('testing')
      cy.get('#phone').type('bla')
      cy.contains('button', 'Send').click()
      cy.get('#phone').should('be.empty')
  })

  it('displays an error message when the phone becomes required but is not filled in before the form submission', () => { 
    cy.get('input[name="firstName"]').type('Lana')
    cy.get('input[name="lastName"]').type('Taran')
      cy.get('input[id="email"]').type('lana')
      cy.get('textarea').type('testing')
      cy.get('#phone-checkbox').check()
      cy.contains('button', 'Send').click()

      cy.get('span[class="error"]').should('be.visible')
  })

  it('fills and clears the first name, last name, email, and phone fields', () => { 
    cy.get('input[name="firstName"]').type('Lana').should('have.value', 'Lana').clear().should('have.value', '')
    cy.get('input[name="lastName"]').type('Taran').should('have.value', 'Taran').clear().should('have.value', '')
      cy.get('input[id="email"]').type('lana@test.com').should('have.value', 'lana@test.com').clear().should('have.value', '')
      cy.get('textarea').type('testing').should('have.value', 'testing').clear().should('have.value', '')
  })

  it('displays an error message when submitting the form without filling the required fields', () => { 
      cy.contains('button', 'Send').click()
      cy.get('.error').should('be.visible')
  })

  it('successfully submits the form using a custom command', () => { 
    const data = {
      firstName: 'John',
      lastName: 'Dou',
      email:'lt@lt.com',
      comment: 'this is very important text'
    }
    cy.fillMandatoryFieldsAndSubmit(data)
    cy.get('span[class="success"]').should('be.visible')
})

it('selects a product (YouTube) by its content', () => { 
  cy.get('#product').select('YouTube').should('have.value', 'youtube')  
})
it('selects a product (Mentorship) by its value', () => { 
  cy.get('#product').select('mentorship').should('have.value', 'mentorship')  
})

it('selects a product (Blog) by its index', () => { 
  cy.get('#product').select(1).should('have.value', 'blog')  
})

it('checks the type of service "Feedback"', () => { 
  cy.get('input[type="radio"]').check('feedback').should('be.checked')
})

it('checks each type of service', () => { 
  cy.get('#support-type')
  .find('input[type=radio]')
  .each(typeOfService => {
    cy.wrap(typeOfService)
    .check()
    .should('be.checked')
  })
})

it('checks both checkboxes, then unchecks the last one', () => { 
  cy.get('input[type="checkbox"]').check().should('be.checked')
  .last()
  .uncheck()
  .should('not.be.checked')
})

it('selects a file from the fixtures folder', () => { 
  cy.get('input[type="file"]')
  .selectFile('cypress/fixtures/example.json')
  .should((input)=>{
    expect(input[0].files[0].name).to.equal('example.json')
  }
  )
})

it('selects a file simulating a drag-and-drop', () => { 
  cy.get('input[type="file"]')
  .selectFile('cypress/fixtures/example.json', {action:'drag-drop'})
  .should((input)=>{
    expect(input[0].files[0].name).to.equal('example.json')
  }
  )
})

it('selects a file using a fixture to which an alias was given', () => { 
  cy.fixture('example.json')
  .as('myFile')
  cy.get('input[type="file"]')
  .selectFile('@myFile')
  .should((input)=>{
    expect(input[0].files[0].name).to.equal('example.json')
  }
  )
})

it('verifies that the privacy policy page opens in another tab without the need for a click', () => { 
  cy.contains('a', 'Privacy Policy')
  .should('have.attr', 'href', 'privacy.html')
  .should('have.attr', 'target', '_blank')
})

it('access the privacy policy page by removing the target, then clicking on the link.', () => { 
  cy.contains('a', 'Privacy Policy')
  .invoke('removeAttr', 'target')
  .click()
  cy.contains('h1','TAT CSC - Privacy Policy')
})


})