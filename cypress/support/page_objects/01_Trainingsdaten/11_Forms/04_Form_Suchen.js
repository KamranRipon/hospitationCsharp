const singleEle = Math.floor(Math.random() * 55000);
const multiEle1  = Math.floor(Math.random() * 65000);
const multiEle2  = Math.floor(Math.random() * 65000);
export class form_suchen {

    formSuchen() {
        /* C. Test Form Suchen*/

        // Expand Trainingsdaten and Enter to Actin
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerForms"]')
        
        // Ass Some Random Value to Actions
        const randonVal = ['form'+String(multiEle1), 'form'+String(multiEle2), 'weather'+String(singleEle)]

        cy.addRandValue(randonVal,'[data-cy="form-create"]','[data-cy="form-name"]', '[data-cy="create-button"]','[data-cy="navDrawerForms"]')
            
        // Selecting Entire Table
        cy.selectEntireTbl()
        cy.log('Line 19')
        //create a variable for assertion for multiple matched return
        var multiple
        cy.get('[data-cy="form-table-search"]')
                .type('form')
        cy.wait(300)
        cy.get('tbody').find('tr')
            .then(function($tbLength) {
                multiple = $tbLength.length
                cy.log(multiple)
            })
        

        //clear action-table-search
        cy.get('[data-cy="form-table-search"]').clear()

        // Single action
        cy.get('[data-cy="form-table-search"]')
            .type(randonVal[1])
        cy.log('Line 35')
        // Assert Return Result
        cy.get('tbody')
            .find('tr')
            .should('have.length', 1)
            .find('td:nth-child(1)')
            .should('have.text', randonVal[1])
        cy.log('Line 42')
        // Multiple Action
        cy.get('[data-cy="form-table-search"]')
            .clear()
            .type('form')
        cy.get('tbody')
            .find('tr')
            .then((multiRow) => {
                cy.log(multiRow.length)
                cy.wrap(multiRow).should('have.length', multiple)
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('contain','form')
            })
            
        // Nonexisting Action
        cy.get('[data-cy="form-table-search"]')
            .clear()
            .type('sky')
                
        cy.get('tbody')
            .find('tr')
            .should('contain',"")

        cy.get('[data-cy="form-table-search"]').clear() 
    }
}
// 
export const onFormSuchen = new form_suchen()