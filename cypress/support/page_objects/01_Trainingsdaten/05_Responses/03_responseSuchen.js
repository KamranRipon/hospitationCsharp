export class response_suchen {

    responseSuchen() {

        /* Response Anlegen Testing */
        cy.Trainingsdaten('[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");
        
        // Anlegen Some Random Value to Response
        const randonVal = ['response1', 'response2', 'weather']
        cy.wrap(randonVal).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="response-create"]')
                .click()

            cy.get('[data-cy="response-name"]')
                .click({force:true})
                .type(index)

            cy.get('[data-cy="create-button"]')
                .click()
            
            // Back to Response Tab
            cy.get('[data-cy="navDrawerResponses"]')
                .click()
        })
        
        // Selecting Entire Table
        cy.selectEntireTbl()
                           
        // Single Response
        cy.get('[data-cy="response-table-search"]')
            .type('weather')

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', 'weather')
        
        // Multiple Response
        cy.get('[data-cy="response-table-search"]')
            .clear()
            .type('response')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 2)
            .find('td:nth-child(1)')
            .should('contain','response')

        // Nonexisting Response
        cy.get('[data-cy="response-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="response-table-search"]').clear() 
    }
}
// 
export const onResponseSuchen = new response_suchen()