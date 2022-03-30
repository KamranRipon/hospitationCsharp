const randNumber = Math.floor(Math.random() * 65000);
const addValue = 'DummyValue'+ String(randNumber)

export class intent_hinzufuegen {
        
    intentsHinzufuegen() {

        // Open Trainingsdate and enter to Intents
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')
                
        // checking url after clicking Inten Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        // Select Entire Table
        cy.selectEntireTbl()

        // Get the length of Intent-table for later Assertion
        var nrOfRow
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .then(function($intentTabLength) {
                nrOfRow = $intentTabLength.length
                if(nrOfRow < 2) {
                    nrOfRow = nrOfRow
                }
                else {
                    nrOfRow = nrOfRow +1
                }
            })

        // Create an Intent
        cy.get('[data-cy="intent-create"]')
            .should('be.visible')
            .click()
        
        // assert landing site
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/neu/`);

        // 1. Name should not be empty, error message should contain "Name"

        // 1.1 Warning message below input field
        cy.warningNotification('[role="alert"]')

        // 1.2 Warning message for space and Slace
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="intent-name"]')
            .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('be.visible')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            cy.get('[data-cy="intent-name"]').clear()
        })

        // 1.2 Error message after unsuccessful saving

        cy.get('[data-cy="create-button"]').click()
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das','Intent')
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for successfully saved values

        // add an intent-name and intent-description
        cy.get('[data-cy="intent-name"]')
            .type(addValue)
            .get('[data-cy="intent-description"]')
            .type(addValue)

        // create-button
        cy.get('[data-cy="create-button"]')
            .should('be.visible')
            .click()
            .wait(400)

        // 2.1 Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue +'" wurde erfolgreich gespeichert ')
        })

        // 5. Click on "Anlegen" remains on details page
        cy.url().then((URL) => {
            cy.wrap(URL).should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/${String(nrOfRow)}/`);
        })
        // Back to intent
        cy.get('[data-cy="navDrawerIntents"]').click()
            //.wait(300)

        // 2.2 Assert in table
        cy.get('[data-cy="intent-table-search"]').type(addValue)
        // Selecting Entire Table
        cy.selectEntireTbl()
        // Assert Value in intent-table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue)
            })

        cy.get('[data-cy="intent-table-search"]').clear()
                
        // 3.Checking for Duplicate Name

        // Enter to Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]').click()
        // add an intent-name and an intent-description
        cy.get('[data-cy="intent-name"]')
            .type(addValue)
            .get('[data-cy="intent-description"]')
            .type(addValue)
    
        // create button
        cy.get('[data-cy="create-button"]').click()

        // 3.1 Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Intent konnte nicht gespeichert werden. ')
        cy.wait(300)
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // Leave site by clicking Intests
        cy.get('[data-cy="navDrawerIntents"]')
            .click()
            .wait(200)
        
        // Add some addition name to Intests for test intent-search
        var textList = ["test15","test1", "weather"]

        cy.wrap(textList).each((index) => {

            cy.get('[data-cy="intent-create"]').click()

            cy.get('[data-cy="intent-name"]')
                .type(index)

            cy.get('[data-cy="intent-description"]')
                .type(index)

            // Checking Radio Button
            cy.get('[role="radiogroup"]')
                .find('[value="no"]')
                .click({force:true})
                .should('be.checked')

            cy.get('[role="radiogroup"]')
                .find('[value="yes"]')
                .click({force:true})
                .should('be.checked')
                    
            cy.get('[data-cy="create-button"]').click()

            cy.get('[data-cy="navDrawerIntents"]').click()
        })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.get('[data-cy="navDrawerIntents"]').click()

        cy.get('[data-cy="intent-create"]').click()

        cy.get('[data-cy="intent-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerIntents"]').click()

        cy.get('[data-cy="intent-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        // Close Trainingsdaten Tab
        cy.get('[role="button"]')
            .contains('Trainingsdaten')
            .click()
    }
}
// Export class
export const onIntentHinzufuegen = new intent_hinzufuegen()