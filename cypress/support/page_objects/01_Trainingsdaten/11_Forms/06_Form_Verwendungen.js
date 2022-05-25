const singleEle = Math.floor(Math.random() * 55000);
const multiEle1  = Math.floor(Math.random() * 750000);
const multiEle2  = Math.floor(Math.random() * 85000);

const AV = Math.floor(Math.random() * 75500);
const FV = Math.floor(Math.random() * 75500);
const RU = Math.floor(Math.random() * 55500);
const FO = Math.floor(Math.random() * 15500);
const ST = Math.floor(Math.random() * 95500);

export class form_Verwendungen {

    verwendugen() {
        /* C. Test Form Suchen*/

        // Expand Trainingsdaten and Enter to Forms
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerForms"]')

        // Add Some Random Value to Actions
        const randonVal = ['form'+String(multiEle1)]

        var Steps = ['Intent_Rules_'+String(RU), 'Stories_'+String(ST)]

        // 1. Test the existance of Verwendungen column in Form Table.

        // 2. Compare showed uses number on Form table with under Verwendungen tab

        /*
        Add a new Form name
        use this form name in Intent-Rule and stories
        */
        
        // 1. add Forms button "form_used"
        cy.get('[data-cy="form-create"]').click()
            
        cy.get('[data-cy="form-name"]')
            .type("form_used"+String(FV))

        cy.log("form_used"+String(FV))

        // Click Anlegen
        cy.get('[data-cy="create-button"]').click()

        // remove success message
        cy.get('[data-cy="success-remove"]').click()

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
            .contains('Form Start')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()
            //.type('action_used')
            .type("form_used"+String(FV))

        cy.get('[role="option"]')
            .last()
            .click()

        // Anlegen Rules 
        cy.get('[data-cy="create-button"]')
            .click()
        cy.log('Line 88')
        cy.wait(400)

        //8. Navigate to Stories and add a story with step “form_used” 
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
            .contains('Form Stop').click()
        
        cy.get('[data-cy="story-step-element-autocomplete"]')
            .eq(1)
            .click()
            // .type('action_used')
            .type("form_used"+String(FV))
        
        cy.get('[role="option"]').last().click()

        cy.get('[data-cy="create-button"]').click()
        
        // Enter to saved form button through form search (search this for button)
        // navigate to Actions
        cy.get('[data-cy="navDrawerForms"]')
            .click()
            .wait(500)

        // select entire Table
        cy.selectEntireTbl()

        // search form-name
        cy.get('[data-cy="form-table-search"]')
            .type("form_used"+String(FV))
            //.type('Forms_2511')

        // calculate maxi examples or rules on an intent
        var max_val=0
        cy.get('tbody')
            .find('td:nth-child(3)')
            .then(($testFunc2) => {
                max_val = $testFunc2.text()
                max_val = Number(max_val)
                cy.log(max_val)
            })
        
        // enter to form name
        cy.get('tbody')
            .find('tr')
            .click()

        cy.log("form_used"+String(FV))

        // Save form Name for letar assertion
        var formName
        cy.get('[data-cy="form-name"]')
            .invoke('val').as('name')

        cy.get('@name').then((name) => {
            formName = name
            cy.log(formName)
        })

        // nevigate to Verwendungen
        cy.get('[role="tab"]')
            .contains('Verwendungen')
            .click()
            .wait(500)

        cy.get('[role="listitem"]')
            .find('[class="v-list-item__title"]')
            .then(function($verwendungen) {
                var countVerwendungen = $verwendungen.length

                cy.wrap($verwendungen).should('have.length', max_val)
            })
        
        // 3. Under Verwendungen tab enter to each element and assert where it uses

        cy.get('[class="v-card__text"]')
            .last()
            .then(function($useFormItem) {
                for (let i = 0; i < max_val; i++) {

                    cy.get('[role="listitem"]')
                        .find('[class="v-list-item__title"]').eq(i)
                        .should('contain', Steps[i])
                }
            })
    }
}
// 
export const onFormVerwendungen = new form_Verwendungen()