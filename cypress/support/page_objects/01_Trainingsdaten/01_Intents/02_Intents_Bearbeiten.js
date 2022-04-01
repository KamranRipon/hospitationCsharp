const iEdit = Math.floor(Math.random() * 200000);
const newVal = Math.floor(Math.random() * 130500);
const valErr = Math.floor(Math.random() * 100500);
const addValue = 'DummyValue'
export class intent_bearbeiten {

    intentBearbeiten() {

        // Open Trainingsdate tab and enter to Intents
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // Create an intent
        cy.get('[data-cy="intent-create"]')
            .should('be.visible')
            .click()

        // add an intent-name and intent-descriptions
        cy.addIntent(addValue+String(iEdit))

        // create-button
        cy.get('[data-cy="create-button"]')
            .should('be.visible')
            .click()
            .wait(400)

        //success-remove
        cy.successRemove()

        // return to Intent
        cy.get('[data-cy="navDrawerIntents"]').click()

        // Arrange intent-table assending order
        cy.wait(500)
        cy.get('thead').find('tr').find('th:nth-child(1)').click()

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        // 1. Name should not be empty, error message should contain "Name"

        cy.wait(300)
        cy.get('tbody')
            .find('tr').eq(-2)
            .click()
        
        cy.get('[data-cy="intent-name"]').clear()
        
        // 1.1 Warning message below input field
        cy.get('[role="alert"]').eq(0)
            .should('have.text', 'Der Name muss gesetzt sein')

        // 1.2 Warning message for space and Slace
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="intent-name"]')
            .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="intent-name"]')
                .clear()
        })
        // 1.3 Error message after unsuccessful saving
        
        cy.get('[data-cy="save-button"]').click()
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das','Intent')
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for successfully saved values
        cy.addIntent(addValue+String(newVal))
        // save-button
        cy.get('[data-cy="save-button"]').click()
        cy.wait(400)

        // 2.1 Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue+String(newVal) +'" wurde erfolgreich gespeichert ')
        })
        
        //success-remove
        cy.successRemove()
        
        // 2.2 Assert in table
        cy.get('[data-cy="intent-table-search"]').type(addValue+String(newVal))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in intent-table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('contain', addValue+String(newVal))
            })

        // clear search field
        cy.get('[data-cy="intent-table-search"]').clear()

        // Arrange intent-table assending order
        cy.get('thead').find('tr').find('th:nth-child(1)').click()

        /* 3. Checking for Duplicate Name: Name cannot be known already
           3.1 Error message after unsuccessful saving */

        cy.wait(300)
        cy.get('tbody')
            .find('tr').eq(-2)
            .click()
        
        cy.get('[data-cy="intent-name"]').clear()

        // edit intent
        cy.addIntent(addValue+String(iEdit))
        // create-button
        cy.get('[data-cy="save-button"]').click()
        cy.wait(400)
        // Assert Error message after unsuccessful saving
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das', 'Intent')
        cy.wait(1000)
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // Leave site by clicking abort-button
        cy.get('[data-cy="abort-button"]')
            .click()
            .wait(300)
        
        // Select Entire Synonym Table
        cy.selectEntireTbl()

        // 5. Leave site via menu or breadcrump, data must be saved
        cy.wait(300)
        cy.get('tbody')
            .find('tr').eq(-2)
            .click()

        // clear action name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type(addValue+String(valErr))

        cy.get('[data-cy="navDrawerIntents"]').click()
        cy.wait(500)
        // Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue+String(valErr) +'" wurde erfolgreich gespeichert ')
        })
        
        //success-remove
        cy.successRemove()
       
        // search value
        cy.get('[data-cy="intent-table-search"]')
            .type(addValue+String(valErr))

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('contain', addValue+String(valErr))

        // clear search field
        cy.get('[data-cy="intent-table-search"]')
            .clear()

        // 6. Leave site via Abbrechen button, data must not be saved

        cy.get('tbody')
            .find('tr').eq(-2)
            .click()

        // clear intent name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type('someName')

        // click Abort Button
        cy.get('[data-cy="abort-button"]').click()

        cy.get('[data-cy="intent-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
    }
}
// Export class
export const onIntentBearbeiten = new intent_bearbeiten()