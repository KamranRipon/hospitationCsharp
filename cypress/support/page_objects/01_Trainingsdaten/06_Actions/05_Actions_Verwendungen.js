const AV = Math.floor(Math.random() * 75500);
const RU = Math.floor(Math.random() * 55500);
const FO = Math.floor(Math.random() * 15500);
const ST = Math.floor(Math.random() * 95500);

export class action_verwendungen {

    actionVerwendungen() {
        /* D. Test Action Loeschen*/

        // Expand Trainingsdaten and Enter to Action
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerActions"]')

        // 1. add actions button "action_used"
        cy.get('[data-cy="action-create"]').click()
            
        cy.get('[data-cy="action-name"]')
            .type("action_used"+String(AV))

        cy.log("action_used"+String(AV))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        cy.successRemove()

        // 2. Navigate to Intents-Rules
        cy.get('[data-cy="navDrawerIntents"]')
            .click()
            .wait(500)

        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[role="tab"]')
            .contains('Rules')
            .click()

        // 3.	Add a new Rules with steps “action_used”
        cy.get('[data-cy="rule-create"]').click()

        cy.get('[data-cy="rule-name"]')
            .clear()
            .type('Intent_Rules_'+String(RU))

        // Select a step
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})
        
        cy.get('[role="option"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()
            //.type('action_used')
            .type("action_used"+String(AV))

        cy.get('[role="option"]')
            .last()
            .click()

        // Anlegen Rules 
        cy.get('[data-cy="create-button"]')
            .click()
        cy.log('Line 64')
        cy.wait(400)

        // 4. Navigate to Forms
        cy.get('[data-cy="navDrawerForms"]')
            .click()
            .wait(500)

        // 5. Add a Form Buttons
        // Clicking Form Hinzufuegen
        cy.get('[data-cy="form-create"]').click()

        // clear input field
        cy.get('[data-cy="form-name"]')
            .clear()
            .type('Forms_'+String(FO))

        cy.get('[data-cy="create-button"]').click()

        // 6. Navigate to POST RULE
        cy.get('[role="tab"]')
            .contains('Post Rule')
            .click()

        // 7. Add a step with "action_used"
        // Select a step
        cy.get('[data-cy="new-form-step-type-select"]')
            .click({force:true})
        
        cy.get('[role="option"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="new-form-step-autocomplete"]')
            .click()
            // .type('action_used')
            .type("action_used"+String(AV))

        cy.get('[role="option"]')
            .last()
            .click()

        // create button
        cy.get('[data-cy="save-button"]')
            .click()
            .wait(1000)

        //8. Navigate to Stories and add a story with step “action_used” 
        cy.get('[data-cy="navDrawerStories"]')
            .click()
            .wait(500)
        // stories Anlegen
        cy.get('[data-cy="story-create"]').click()
        cy.get('[data-cy="story-name"]')
            .type('Stories_'+String(ST))

        // add steps
        cy.get('[data-cy="story-step-element-autocomplete"]').eq(0)
            .click()
            .get('[role="option"]').last()
            .click({force:true})

        cy.get('[data-cy="story-step-type-select"]').eq(1)
            .click({force:true})

        cy.get('[role="option"]')
            .contains('Action').click()
        
        cy.get('[data-cy="story-step-element-autocomplete"]')
            .eq(1)
            .click()
            // .type('action_used')
            .type("action_used"+String(AV))
        
        cy.get('[role="option"]').last().click()

        cy.get('[data-cy="create-button"]').click()

        // 9. Enter to saved action button through action search (search this action button)
        // navigate to Actions
        cy.get('[data-cy="navDrawerActions"]')
            .click()
            .wait(500)

        // select entire Table
        cy.selectEntireTbl()

        // get the size of table
        cy.wait(500)
        var NrRow
        cy.get('tbody')
            .find('tr').then(function($tblLength) {
                NrRow = $tblLength.length
                cy.log(NrRow)
            })

        cy.get('[data-cy="action-table-search"]')
            .type("action_used"+String(AV))
            
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        //10.Navigate to Verwendungen
        cy.get('[role="tab"]')
            .contains('Verwendungen')
            .click()

        cy.get('[role="listitem"]').eq(0)
            .should('contain','Intent_Rules_'+String(RU))

        cy.get('[role="listitem"]').eq(1)
            .should('contain','Forms_'+String(FO))

        cy.get('[role="listitem"]').eq(2)
            .should('contain','Stories_'+String(ST))
    }
}
// 
export const onActionVerwendungen = new action_verwendungen()