const singleEle = Math.floor(Math.random() * 5500);
const multiEle1  = Math.floor(Math.random() * 6500);
const multiEle2  = Math.floor(Math.random() * 6500);

export class action_suchen {

    actionSuchen() {
        /* C. Test Action Suchen*/

        // Expand Trainingsdaten and Enter to Actin
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerActions"]')
        
        // Ass Some Random Value to Actions
        const randonVal = ['action'+String(multiEle1), 'action'+String(multiEle2), 'weather'+String(singleEle)]
        cy.addRandValue(randonVal,'[data-cy="action-create"]','[data-cy="action-name"]', '[data-cy="create-button"]','[data-cy="navDrawerActions"]')
            
        // Selecting Entire Table
        cy.selectEntireTbl()

        //create a variable for assertion for multiple matched return
        var multiple
        cy.get('[data-cy="action-table-search"]')
                .type('action')
        cy.get('tbody').find('tr')
            .then(function($tbLength) {
                multiple = $tbLength.length
            })

        //clear action-table-search
        cy.get('[data-cy="action-table-search"]').clear()  

        // Single action
        cy.get('[data-cy="action-table-search"]')
            .type(randonVal[1])

        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', randonVal[1])
        
        // Multiple Action
        cy.get('[data-cy="action-table-search"]')
            .clear()
            .type('action')
        cy.get('tbody')
            .find('tr')
            .then((multiRow) => {
                cy.wrap(multiRow).should('have.length', multiple)
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('contain','action')
            })
            
        // Nonexisting Action
        cy.get('[data-cy="action-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="action-table-search"]').clear() 
    }
}
// 
export const onActionSuchen = new action_suchen()