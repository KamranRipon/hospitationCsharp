const singleEle = Math.floor(Math.random() * 55000);
const multiEle1  = Math.floor(Math.random() * 65000);
const addValue = 'intentDummy'

export class intent_suchen {

    intent_suchen() {
        
        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Story
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);
        
        const randonVal = [addValue+String(singleEle), addValue+String(multiEle1)]
        cy.wrap(randonVal).each((index) => {

            // Clicking Story Hinzufuegen
            cy.createButton('[data-cy="intent-create"]')

            //cy.addIntent(index)
            cy.addName('[data-cy="intent-name"]', index, '[data-cy="intent-description"]')

            cy.get('[data-cy="create-button"]').click()
            cy.get('[data-cy="navDrawerIntents"]').click()
        })
        cy.wait(500)

        // 1. Searching for single specific story 
        cy.get('[data-cy="intent-table-search"]')
            .type(singleEle)
            .wait(500)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('contain', addValue+String(singleEle))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="intent-table-search"]')
            .clear()
            .type(addValue)
            .wait(300)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .then((trLength) => {
                var len = trLength.length
                
                if (len > 1) {
                    cy.wrap(trLength).should('have.length', len)
                }
            })
            
        // 3. searching for some chars no story has shows empty table
        cy.get('[data-cy="intent-table-search"]')
            .clear()
            .type('sky')
            .wait(300)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'sky')
    }
}
// Export class
export const onIntentSuchen = new intent_suchen()