const i = Math.floor(Math.random() * 5000);
const ei = Math.floor(Math.random() * 3000);
const er = Math.floor(Math.random() * 4000);
const x = Math.floor(Math.random() * 3500);
const duplicat = Math.floor(Math.random() * 65000);

const addValue = 'DummyValue'
const addExample = 'testExample'
export class rules_bearbeiten {

    rulesBearbeiten() {

        /* Rules Anlegen Testing */

        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        // // Enter Intent
        // // Entering to Intents
        // cy.get('[data-cy="navDrawerIntents"]')
        //     .click({force:true})
        //     .wait(500)

        // // Clicking intent Hinzufuegen
        // cy.get('[data-cy="intent-create"]')
        //     .click({force:true})

        // // Add Intent Name
        // cy.get('[data-cy="intent-name"]')
        //     .clear()
        //     .click({force:true})
        //     .type(addValue+String(ei))
        
        // // Add a description
        // cy.get('[data-cy="intent-description"]')
        //     .clear()
        //     .click({force:true})
        //     .type(addValue+String(eb))

        // // Click Anlegen
        // cy.get('[data-cy="create-button"]')
        //     .click()
        //     .wait(500)

        // // Back to Intents page
        // cy.get('[data-cy="navDrawerIntents"]')
        //     .click({force:true})
        //     .wait(500)
        
        // 1.1 Edit Rules Name
        // 1.1.1 Warning message

        // Selecting Entire Table
        // cy.get('[class="v-select__slot"]').click()
        // cy.get('[class="v-list-item__content"]')
        //     .contains('Alle')
        //     .click({force:true})

        // select whole table
        cy.selectEntireTbl()

        // 1. Edit name should not be empty, error message should contain "Name"
        
        // 1.1 Warning message below input field
        var inName
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')
            .then(($testFunc) => {

                const vall = $testFunc.text()
                var sp_vall = vall.split('')
                var max_val = 0
                var num

                for (num=0; num < sp_vall.length; num++){
                    if(sp_vall[num] > max_val) {
                        max_val = sp_vall[num]
                    }
                }
                // Enter To Intent Row contain more than one Rules
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(4)')
                    .contains(max_val)
                    .click()

                // Save Intent Name for letar Assertion
                cy.get('[class="v-text-field__slot"]')
                    .find('[data-cy="intent-name"]')
                    .invoke('val').as('name')
                    
                    cy.get('@name').then((name1) => {

                      cy.log(name1) //prints name
                      inName = name1
                      cy.log(inName)
                    })
                    // .find('tr')
                    // .then(($intentName) => {
                    //     intentname = $intentName.text()
                    //     return intentname
                    // })

                // cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                //     .find('tr')
                //     .find('td:nth-child(4)')
                //     .contains(max_val)
                //     .click({force:true})
        })

        // Entering to rules table
        // cy.get('[class="v-slide-group__wrapper"]')
        //     .find('[class="v-tab"]').eq(1)
        cy.get('[role="tab"]')
            .contains('Rules')
            .click()
            .wait(300)

        // add a new rules
        cy.get('[data-cy="rule-create"]').click()
        cy.get('[data-cy="rule-name"]').clear()
            .type(addValue+String(duplicat))
        // Select a step
        cy.get('[data-cy="rule-new-step-type-select"]').click({force:true})
        cy.get('[role="option"]').contains('Action')
            .click({force:true})
        cy.get('[data-cy="rule-new-step-item-autocomplete"]').click()
        cy.get('[role="option"]')
            .last()
            .click()

        // create
        cy.get('[data-cy="create-button"]').click()
        // remove success message
        cy.successRemove()

        // Entering to first row of rules table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            .wait(300)

        // Clear Rules Name field
        cy.get('[data-cy="rule-name"]').clear()
        
        // Assert initial warning Message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')

        cy.get('[data-cy="rule-name"]').clear()

        // 1.2 Leave site with breadcrump 
        //Case 1: Rules name Empty
        cy.log('Line 161')
        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains('Rules')
        //     .click()
        //     .wait(500)

        // 1.2 Error message after unsuccessful saving
        cy.get('[data-cy="save-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 1.2 Leave site with breadcrump 
        //Case 2: Rules name not empty Empty but remove all steps

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(er))

        // Remove steps
        cy.get('[data-cy="rule-remove-step"]').eq(0)
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()
            .wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[data-cy="errorMessageBody"]')
            .should('have.text', ' Die Schritte der Rule sind ungültig ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 2. Check for successfully saved values

        // 2.1 Assert Notification
        cy.log('Line 208')
        // Select steps
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})

        // Select Action or Response from list
        cy.get('[role="option"]').contains('Action').click({force:true})
        cy.get('[data-cy="rule-new-step-item-autocomplete"]').click()
        cy.get('[role="option"]')
            .last()
            .click()

        // // leave site with breadcrump
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        //cy.get('[data-cy="save-button"]').click()

        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(er)+'" '+ 'wurde erfolgreich gespeichert ')

        cy.successRemove()

        // 2.2 Assert in table
        cy.log('Line 235')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(er))

        // 6. leave site via button "Abbrechen" navigates to table of rules 
        // and does not save edited data
        cy.log('Line 248')
        // Entering to first Row of Rules table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        // Clear and add a unique name to Rules Name field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addExample+String(er*ei))
        
        // Clicking Abbrechen Button
        cy.get('[data-cy="abort-button"]')
            .click()

        cy.get('[data-cy="rule-table-search"]')
            .clear()
            .type(addExample+String(er*ei))

        // Assert data in the Rules Table
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', addExample+String(er*ei))

        // Clear Search Field
        cy.get('[data-cy="rule-table-search"]').clear()

        // 3. Check for duplicate name

        // 3.1 Error message after unsuccessful saving
        cy.log('Line 268')
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($dupRuleName) {

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .click()
                
                // Clear and add a Rule name
                cy.get('[data-cy="rule-name"]')
                    .clear()
                    .type($dupRuleName.text())

                cy.get('[class="v-breadcrumbs__item"]')
                    .contains('Rules')
                    .click()

                cy.log('Line 301')
                cy.get('[data-cy="errorMessageTitle"]')
                        .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

                // Clicking Abbrechen Button
                cy.get('[data-cy="abort-button"]').click()

                // 3.2 Table should not contain same value twice
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('not.have.text', $dupRuleName.text())
            })
            
        // 1.5. Saving works if Data is Correct
        cy.log('Line 304')
        cy.log('1.5. Saving works if Data is Correct')

        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(x))

        // Select step
        cy.log('Line 699')

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        cy.wait(500)
        // Assert Success Message

        cy.get('[data-cy="successMessageTitle"]')
                .should('have.text', ' Die Rule'+' "'+addValue+String(x)+'" '+ 'wurde erfolgreich gespeichert ')

        cy.successRemove()

        // Assert Data in Rules Table
        cy.log('Line 726')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(x))

        // delet one stape
        cy.log('Line 795')
        // cy.get('tbody')
        //     .find('tr')
        //     .first()
        //     .click()

        // cy.get('[data-cy="rule-remove-step"]').eq(1)
        //     .click()

        // Back to Rules Table
        // cy.get('[class="v-breadcrumbs__item"]')
        //     .contains('Rules')
        //     .click()

        // 6. Number of Rules must show correctly in Intent Table
        cy.log('Line 810')
        // select entire rules table
        cy.selectEntireTbl()
        cy.get('tbody')
            .find('tr')
            .then(function($countTr2) {
                const NoOfRules2 =$countTr2.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})
                cy.log(addValue+String(i))
                cy.log(inName)
                cy.get('[data-cy="intent-table-search"]')
                    .click()
                    .type(inName)

                cy.get('tbody')
                    .find('tr')
                    .first()
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(NoOfRules2)+' ')

                // cy.get('[data-cy="intent-table-search"]')
                //     .clear()
        })

    }
}
// Exportint class frontEnd to End2End to test
export const onRulesBearbeiten = new rules_bearbeiten()