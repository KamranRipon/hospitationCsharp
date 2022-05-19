const ac     = Math.floor(Math.random() * 6500);
const addValue = 'ActionAnDummy'

export class action_anlegen {
    actionAnlegen() {
        
        // Open Trainingsdate Tab and enter to Actions
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerActions"]')
        
        // Assert URL after clicking Actions
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/action/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/action/");

        // Clicking Action Hinzufuegen
        cy.createButton('[data-cy="action-create"]')

        // checking url after clicking Action Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/action/neu/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/action/neu/");
        
        // 1. Name should not be empty, error message should contain "Name"
        //    1.1 Action title
        //        1.1.1 Assert warning message below the input field
        
        //Assert warning notification
        cy.warningNotification('[role="alert"]')

        // add a space or '/' to input field
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="action-name"]')
                .type(index)

            //Assert warning notification
            cy.get('[role="alert"]')
                .should('have.text','Der Name enthält ungültige Zeichen!      ')
                
            // Remove space or '/'
            cy.get('[data-cy="action-name"]').clear()
        })
    
        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()
        
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die','Action')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        // Add a response name with and assert notification & Assert in action table
        cy.get('[data-cy="action-name"]')
            .type(addValue+String(ac))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        // 7. Click on "Anlegen" navigates to table of actions
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/action/`);
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Action'+' "'+addValue+String(ac)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Closing Successfully Saved Notification
        cy.successRemove()
        
        // 3. Check for successfully saved values
        // 3.2 Assert in table
        cy.get('[data-cy="action-table-search"]')
            .type(addValue+String(ac))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(ac))
            })

        // clear search field
        cy.get('[data-cy="action-table-search"]').clear()
        
        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.1 Error message after unsuccessful saving 
        cy.get('[data-cy="action-create"]').click()

        cy.get('[data-cy="action-name"]')
            .type(addValue+String(ac))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Action konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Action
        //     2.1.2 Valaue should be in the Action table, assert Action Table
        // return to Action
        cy.get('[data-cy="navDrawerActions"]').click()

        // action-table-search
        cy.get('[data-cy="action-table-search"]')
            .type(addValue+String(ac))

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert table length in Action Table
        cy.get('tbody')
            .find('tr')
            .then(function($synName2) {
                const resTbLen = $synName2.length
                cy.log(resTbLen)
                cy.wrap($synName2).should('have.length', resTbLen)
            })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.get('[data-cy="navDrawerActions"]').click()

        cy.get('[data-cy="action-create"]')
            .click({force:true})

        cy.get('[data-cy="action-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerActions"]').click()

        cy.get('[data-cy="action-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.get('[data-cy="action-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onActionAnlegen = new action_anlegen()