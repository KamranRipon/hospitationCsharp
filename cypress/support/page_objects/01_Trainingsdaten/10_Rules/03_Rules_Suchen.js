const search = Math.floor(Math.random() * 65000);
const singleReturn = 'DummyValue'+String(search)
const addValue = 'DummyValue'
export class rules_suchen {

    rulesSuchen() {
        
        // Enter to Intents
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // select entire table
        cy.selectEntireTbl()

        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('tr')
            //.first()
            .find('td:nth-child(4)')
            .last()
            .click({force:true})
            .wait(500)
        
        // Entering to rules table
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()
            .wait(500)

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()
                
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .click({force:true})
            .type(singleReturn)
        //
        // Select a step
        cy.get('[data-cy="rule-new-step-type-select"]').click({force:true})
        cy.get('[role="option"]').contains('Action')
            .click({force:true})
        cy.get('[data-cy="rule-new-step-item-autocomplete"]').click()
        cy.get('[role="option"]').last().click()
        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]').click()

        // Try to save with empty name
        // Click Anlegen
        cy.log('Line 843')
        cy.get('[data-cy="create-button"]')
            .click()    

        // Back to Rules Table
        cy.get('[class="v-slide-group__wrapper"]')
            .contains('Rules')
            .click({force:true})

        // Single Rules
        cy.get('[data-cy="rule-table-search"]')
            .click({force:true})
                .type(singleReturn)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('contain', singleReturn)
        
        // Multiple Intent
        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type(addValue)

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .then((trLength) => {
                var len = trLength.length
                
                if (len > 1) {
                    cy.wrap(trLength).should('have.length', len)
                }
            })

        // Nonexisting Intent
        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="rule-table-search"]')
            .clear() 
    }
}
// Export class
export const onRulesSuchen = new rules_suchen()