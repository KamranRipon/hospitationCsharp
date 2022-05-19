import { eq } from "junit/lib/utils";

export class intent_example_loeschen {
    
    intentExampleLoeschen() {

        // Open Trainingsdate Tab and enter to Intents
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')
                
        // checking url after clicking Inten Button
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        // Enter to first row to intent table
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Save intent Name for later Assertion
        var inExName
        cy.get('[data-cy="intent-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })
    
        // Enter to Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
            .wait(500)

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        cy.get('tbody tr').then(function($noRow) {
            const tableRow = $noRow.length
            cy.log(tableRow)

            if (tableRow <= 1 ) {
                cy.log('if Statement true')
                var exmList = ["Example1","Example2", "Example3"]

                cy.wrap(exmList).each((index) => {

                cy.get('[data-cy="create-intent-example"]').click()

                cy.get('[data-cy="example-text"]')
                    .type(index)
                
                cy.get('[data-cy="create-button"]').eq(0)
                    .click()
                    .wait(200)
                })

                cy.get('[data-cy="element-delete-button"]')
                    .first()
                    .click()
                    .wait(500)

                // Confirm Delete
                cy.confirmDelete()
            }
            else {
                cy.log('if Statement false')
                cy.get('[data-cy="element-delete-button"]')
                    .first()
                    .click()
                    .wait(500)

                // Confirm Delete
                cy.confirmDelete()
            }

            cy.log(tableRow)
        })

        cy.log('Line 79')
        cy.wait(500)
        cy.get('tbody tr').then(function($noRowCount) {
            const tableRowCount = $noRowCount.length
            cy.log(tableRowCount)

            // Clicking Intent
            cy.get('[data-cy=navDrawerIntents]')
                .contains('Intents')
                .click()

            cy.get('[data-cy="intent-table-search"]')
                .type(inExName)
            
            // Select first row of the Intent table
            //cy.get('[class="v-icon notranslate editIcon theme--light primary--text"]')
            cy.get('tbody')
            .find('td:nth-child(3)')
            .first().then(function($intentExCount2) {
                cy.wrap($intentExCount2).should('have.text', ' '+tableRowCount+' ')

            })
        })
    }
}
// Export class
export const onIntentExampleLoeschen = new intent_example_loeschen()