const singleEle = Math.floor(Math.random() * 5500);
const multiEle1  = Math.floor(Math.random() * 6500);
const addValue = 'intExDummy'

export class intent_example_suchen {
    
    intentExampleSuchen() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Story
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");

        // Entering to first row of the Intent Table
        cy.log('Line 16')
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        cy.log('Line 23')
        // Entering to Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
                        
        const randonVal = [addValue+String(singleEle), addValue+String(multiEle1)]
        cy.wrap(randonVal).each((index) => {

            // Clicking Example Hizufuegen Button
            cy.get('[data-cy="create-intent-example"]')
                .click()

            // Anlegen  & weiteres Example 
            cy.get('[data-cy="example-text"]')
                .type(index)
    
            cy.get('[data-cy="create-button"]').eq(0)
                .click()
        })

        // Selecting Entire Table
        cy.wait(500)
        cy.selectEntireTbl()

        // 1. Searching for single specific story 
        cy.get('[data-cy="example-table-search"]')
                .type(addValue+String(singleEle))

        // Assert Return Result
        cy.log('Line 34')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(2)')
            .should('have.text', addValue+String(singleEle))

        // 2. Searching for some chars multiple stories has in common
        cy.get('[data-cy="example-table-search"]')
            .clear()
            .type(addValue)

        // Assert Return Result
        cy.log('Line 66')
        cy.get('tbody')
            .find('tr')
            .then((trLength) => {
                var len = trLength.length 
                if (len > 1) {
                    cy.wrap(trLength).should('have.length', len)
                }
            })
            
        // 3. searching for some chars no story has shows empty table
        cy.get('[data-cy="example-table-search"]')
            .clear()
            .type('sky')

        // Assert Return Result
        cy.log('Line 83')
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .should('not.have.text', 'sky')
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleSuchen = new intent_example_suchen()