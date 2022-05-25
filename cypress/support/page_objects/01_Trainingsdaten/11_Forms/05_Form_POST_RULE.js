//import { contains } from "cypress/types/jquery";

const singleEle = Math.floor(Math.random() * 55000);
const multiEle1  = Math.floor(Math.random() * 750000);
const multiEle2  = Math.floor(Math.random() * 85000);

export class form_post_rule {

    postRule() {
        /* C. Test Form Suchen*/

        // Expand Trainingsdaten and Enter to Actin
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerForms"]')
        
        // Add Some Random Value to Actions
        const randonVal = ['form'+String(multiEle1)]

        cy.addRandValue(randonVal,'[data-cy="form-create"]','[data-cy="form-name"]', '[data-cy="create-button"]','[data-cy="navDrawerForms"]')

        // remove success message
        cy.get('[data-cy="success-remove"]').click()

        // enter to saved form
        cy.get('[data-cy="form-table-search"]')
            .type(randonVal[0])
            
        // Selecting Entire Table
        cy.selectEntireTbl()
        cy.log('Line 19')

        // Navigate to POST RULE
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        cy.wait(300)

        //enter to POST RULE
        cy.get('[role="tab"]')
            .contains('Post Rule')
            .click()

        // add Steps
        cy.get('[data-cy="new-form-step-type-select"]')
            .click({force:true})
        
        cy.get('[role="option"]')
            .contains('Action')
            .click({force:true})

        //select button
        cy.get('[data-cy="new-form-step-autocomplete"]')
            .click()

        cy.get('[role="listbox"]').eq(1)
            .get('[role="option"]')
            .last()
            .click()

        // add another Steps
        cy.get('[data-cy="new-form-step-type-select"]')
            .click({force:true})
        
        cy.get('[role="option"]')
            .contains('Response')
            .click({force:true})

        //select button
        cy.get('[data-cy="new-form-step-autocomplete"]')
            .click()

        cy.get('[role="option"]')
            .last()
            .click()
        
        cy.get('[data-cy="save-button"]')
            .click()
        cy.log('Line 73')
        cy.wait(400)

        // 2.1 Assert Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Form-Rule'+' "'+randonVal[0]+'" '+ 'wurde erfolgreich gespeichert ')
        
        cy.get('[data-cy="success-remove"]').click()

        // enter to saved form
        cy.get('[data-cy="form-table-search"]')
            .type(randonVal[0])
        
        // 2.2 Assert in Table
        cy.wait(300)
        cy.get('tbody tr')
            .find('td:nth-child(1)')
            .should('have.text', randonVal[0])

        // clear search field
        cy.get('[data-cy="form-table-search"]').clear()
    }
}
// 
export const onPostRule = new form_post_rule()