const singleEle = Math.floor(Math.random() * 55000);
const multiEle1  = Math.floor(Math.random() * 65000);
const addValue = 'intentDummy'

export class intent_suchen {

    intent_suchen() {
        
        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Story
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");
        
        const randonVal = [addValue+String(singleEle), addValue+String(multiEle1)]
        cy.wrap(randonVal).each((index) => {

            // Clicking Story Hinzufuegen
            cy.createButton('[data-cy="intent-create"]')

            //cy.addIntent(index)
            cy.addName('[data-cy="intent-name"]', index, '[data-cy="intent-description"]')

            cy.get('[data-cy="create-button"]').click()
            cy.get('[data-cy="navDrawerIntents"]').click()
        })

        // Selecting Entire Table
        cy.wait(500)
        //cy.selectEntireTbl()

        // 1. Searching for single specific story 
        cy.get('[data-cy="intent-table-search"]')
            .type(singleEle)
            .wait(500)

        // Assert Return Result
        cy.log('Line 34')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(singleEle))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="intent-table-search"]')
            .clear()
            .type(addValue)

        // Assert Return Result
        cy.log('Line 46')
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

        // Assert Return Result
        cy.log('Line 65')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('not.have.text', 'sky')
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentSuchen = new intent_suchen()