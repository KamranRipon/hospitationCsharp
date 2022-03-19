const m = Math.floor(Math.random() * 65000);
const addValue = 'DummyValue'+ String(m)

export class intent_hinzufuegen {
        
    intentsHinzufuegen() {

        // Open Trainingsdate Tab and enter to Intents
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')
                
        // checking url after clicking Inten Button
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");

        // Select Entire Table
        cy.selectEntireTbl()

        // Get the length of Intent-table for later Assertion
        var nrOfRow
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

        // Enter to Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .should('be.visible')
            .click()
        
        // assert landing site
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/neu/");

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

        // 3. Check for successfully saved values

        // 3.1 Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue +'" wurde erfolgreich gespeichert ')
        })

        // 5. Click on "Anlegen" remains on details page
        cy.url().then((URL) => {
            cy.wrap(URL).should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/"+String(nrOfRow)+"/");
        })
        // Back to intent
        cy.get('[data-cy="navDrawerIntents"]')
            .click()
            .wait(300)

        // 3. Check for successfully saved values
        // 3.2 Assert in table
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

        // 1. Name should not be empty, error message should contain "Name"
                
        // Enter to Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]').click()
        cy.log('Line 74')
        // Check for require name waring message 
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Name muss gesetzt sein')
            

        // 2. Name should not contain "spaces" or "/", saving impossible, 
        // Checking warning message for "space" or "/" 
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="intent-name"]')
            .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('be.visible')
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="intent-name"]')
                .clear()
        })
                
        /* 3.Checking for Duplicate Name: Name cannot be known in Intent
           3.1 Error message after unsuccessful saving */

        // add an intent-name and an intent-description
        cy.get('[data-cy="intent-name"]')
            .type(addValue)
            .get('[data-cy="intent-description"]')
            .type(addValue)            
    
        // create button
        cy.get('[data-cy="create-button"]')
                .click()
        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Das Intent konnte nicht gespeichert werden. ')
        cy.wait(300)
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // Leave site by clicking Intests
        cy.get('[data-cy="navDrawerIntents"]')
            .click()
            .wait(150)
        
        // Add some addition name to Intests
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

            cy.get('[data-cy="navDrawerIntents"]')
                .click()
        })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.log('Line 167')
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
// Exportint class frontEnd to End2End to test
export const onIntentHinzufuegen = new intent_hinzufuegen()