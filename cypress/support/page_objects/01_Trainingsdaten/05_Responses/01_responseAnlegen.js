const t     = Math.floor(Math.random() * 5000);
const addValue = 'resAnlegDummy'

export class responses_anlegen {

    responseAnlegen() {
        /* Response Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/response/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");

        // Clicking Response Anlegen
        cy.createButton('[data-cy="response-create"]')

        // checking url after clicking Intent Hinzufuegen
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/response/neu/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/neu/");
        
        // 1. Name should not be empty, error message should contain "Name"
        //    1.1 Response
        //        1.1.1 Warning message below input field
        
        //Assert warning notification
        cy.warningNotification('[role="alert"]')

        // add a space or '/' to input field
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="response-name"]')
                .type(index)

            //Assert warning notification
            cy.spaceWarningNotification('[role="alert"]')

            // Remove space or '/'
            cy.get('[data-cy="response-name"]').clear()
        })
    
        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die', 'Response')
        
        // Close Error Notification
        cy.errorRemove()
        
        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        // Add a response name with valid name and assert notification & Assert in Response table
        cy.get('[data-cy="response-name"]')
            .type(addValue+String(t))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()
        
        // Assert Successful Notification
        cy.successMessageTitle('[data-cy="successMessageTitle"]','Die', 'Response', addValue+String(t))
        
        // Closing Successfully Saved Notification
        cy.successRemove()

        // return to Response
        cy.get('[data-cy="navDrawerResponses"]').click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in response table
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(t))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.get('tbody')
            .find('tr')
            //.last()
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(t))
            })

        // clear search field
        cy.get('[data-cy="response-table-search"]').clear()
        
        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.1 Error message after unsuccessful saving 
        cy.get('[data-cy="response-create"]').click()

        cy.get('[data-cy="response-name"]')
            .type(addValue+String(t))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()
        
        // assert error notification
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die', 'Response')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for duplicate name
        // 2.1 Response
        //     2.1.2 Valaue should be in the Response table, assert response Table
        // return to Response
        cy.get('[data-cy="navDrawerResponses"]').click()

        // response-table-search
        cy.get('[data-cy="response-table-search"]')
            .type(addValue+String(t))

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert table length in Response Table
        cy.get('tbody')
            .find('tr')
            .then(function($synName2) {
                const resTbLen = $synName2.length
                cy.wrap($synName2).should('have.length', resTbLen)
            })

        // 4. Leave site via menu or breadcrump, data must not be saved
        cy.get('[data-cy="navDrawerResponses"]').click()

        cy.get('[data-cy="response-create"]')
            .click({force:true})

        cy.get('[data-cy="response-name"]')
            .type('someName')

        cy.get('[data-cy="navDrawerResponses"]').click()

        cy.get('[data-cy="response-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.get('[data-cy="response-table-search"]').clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onResponseAnlegen = new responses_anlegen()