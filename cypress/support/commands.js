// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

const { capitalize } = require("lodash")

// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.session([username, password], () => {
        cy.visit('/login')
    
        cy.get('[data-cy="login-username"]')
            .type(username)

        cy.get('[data-cy="login-password"]')
            .type(password)

        cy.get('[data-cy="login-keep-logged-in"]')
            .click({force:true})
        
        cy.get('[data-cy="login-submit"]')
            .click()
            .wait(500) // without wait sometime login fail
    })
})

Cypress.Commands.add('loginiFunction',(Username, Password) => {
    // Login Function
    cy.contains('Benutzername')
        .click({force:true})
        .type('admin')

    cy.contains('Passwort')
        .click({force:true})
        .type('cciAdmin#2022+')

    cy.get('[data-cy="login-keep-logged-in"]')
        .click({force:true})
        .wait(300)
        
    cy.contains('Anmelden')
        .click()
        .wait(300)
})

Cypress.Commands.add('Trainingsdaten', (navDrawer) => {
    // Expand Trainingsdate Tab
    cy.get('[role="button"]')
        .contains('Trainingsdaten')
        .then((Tdaten) => {         
            if(Tdaten.find('[class="v-list-group__header v-list-item v-list-item--link theme--light"]').length > 0) {
                cy.log('If Statement True')
                cy.get(navDrawer)
                    .click()
            }
            else {
                cy.log('If Statement False')
                cy.get('[class="v-list-group__header v-list-item v-list-item--link theme--light"]')
                    .contains('Trainingsdaten')
                    .click()
                cy.get(navDrawer)
                    .click()
            }
        })
})

Cypress.Commands.add('selectEntireTbl', () => {
    // Selecting Entire Table
    cy.get('[role="button"]')
        .contains('10')
        .click()

    cy.get('[role="option"]')
        .contains('Alle')
        .click({force:true})
})

Cypress.Commands.add('createButton', (create) => {
    // Clicking Hinzufuegen
    cy.get(create)
    //.should('have.attr', 'href')
    //.get(create)
    .click({force:true})
})

Cypress.Commands.add('warningNotification', (alert) => {
    //Assert warning notification
    cy.get(alert)
    .should('have.text','Der Name muss gesetzt sein')
})

Cypress.Commands.add('spaceWarningNotification', (alert) => {
    //Assert warning notification
    cy.get(alert)
        .should('have.text','Der Name enthält ungültige Zeichen!')
})

Cypress.Commands.add('successMessageTitle', (succesTitle, artikel, itemName, value) => {
    // Assert successfully saved
    cy.get(succesTitle)
        .should('have.text', ' '+artikel+' '+itemName+' "'+value+'" '+ 'wurde erfolgreich gespeichert ')
    //.should('have.text', ' Die Response'+' "'+addValue+String(t)+'" '+ 'wurde erfolgreich gespeichert ')
})

Cypress.Commands.add('errorMessageTitle', (errorMessage, artikel, itemName) => {
    //Assert Error message, indication didn't able to save data
    cy.get(errorMessage)
        .should('have.text',' '+ artikel +' '+ itemName +' konnte nicht gespeichert werden. ')
})

Cypress.Commands.add('errorMessageBody',(errorMessage) => {
    cy.get(errorMessage)
        .should('have.text', ' Die Regeln für die Anordnung der Elemente wurden nicht beachtet. ')
})

Cypress.Commands.add('successRemove', () => {
    // remove success notification
    cy.get('[data-cy="success-remove"]').click()
})

Cypress.Commands.add('errorRemove', () => {
    // Close Error Notification
    cy.get('[data-cy="error-remove"]').click()
})

Cypress.Commands.add('addRandValue', (randVAl, create, name, button, backNav) => {
    // add some random value
    cy.wrap(randVAl).each((index) => {

        // Clicking action Hinzufuegen
        cy.get(create)
            .click()

        cy.get(name)
            .click({force:true})
            .type(index)

        cy.get(button)
            .click()
        
        // Back to action Tab
        cy.get(backNav)
            .click()
    })
})

Cypress.Commands.add('storiesAnlegen', (addval) => {
    cy.get('[data-cy="story-name"]')
            .type(addval)

        cy.get('[data-cy="story-step-element-autocomplete"]').eq(0)
            .click()
        cy.get('[role="listbox"]')
            .click()

        cy.get('[data-cy="story-step-type-select"]').eq(1)
            .click({force:true})

        cy.get('[role="option"]')
            .contains('Action')
            .click()
        
        cy.get('[data-cy="story-step-element-autocomplete"]').eq(1)
            .click()
            .get('[role="option"]').last()
            .click({force:true})

        cy.get('[data-cy="story-step-add"]')
            .click()

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
})

Cypress.Commands.add('confirmDelete', () => {
    // Confirm delete
    cy.get('[type="button"]')
    .contains('Löschen')
    .click()
})

Cypress.Commands.add('addName', (name, val, description) => {
    
    // add an intent-name and intent-description
    //cy.get('[data-cy="intent-name"]')
    cy.get(name)
        .clear()
        .type(val)
        //.get('[data-cy="intent-description"]')
        .get(description)
        .clear()
        .type(val)
})

Cypress.Commands.add('addIntent', (val) => {
    
    // add an intent-name and intent-description
    cy.get('[data-cy="intent-name"]')
        .clear()
        .type(val)
        .get('[data-cy="intent-description"]')
        .clear()
        .type(val)
})