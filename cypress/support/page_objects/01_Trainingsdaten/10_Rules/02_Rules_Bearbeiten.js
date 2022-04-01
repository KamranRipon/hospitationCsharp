const i = Math.floor(Math.random() * 5000);
const b = Math.floor(Math.random() * 1000);
const r = Math.floor(Math.random() * 1500);
const a = Math.floor(Math.random() * 2000);
const ei = Math.floor(Math.random() * 3000);
const eb = Math.floor(Math.random() * 3500);
const er = Math.floor(Math.random() * 4000);
const ea = Math.floor(Math.random() * 4500);
const x = Math.floor(Math.random() * 3500);

const addValue = 'DummyValue'
const addExample = 'testExample'
export class rules {

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
        cy.selectEntireTbl()

        // 1. Edit name should not be empty, error message should contain "Name"
        
        // 1.1 Warning message below input field
        var inName
        cy.wait(500)
        cy.log('Line 489')
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(4)')

            .then(($testFunc) => {
                const vall = $testFunc.text()

                var sp_vall = vall.split(" ")
                
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
                cy.get('[class="v-text-field__slot"]').find('[data-cy="intent-name"]').invoke('val').as('name')
                    
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
        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()
            .wait(500)
        
        cy.log('Line 126')
        cy.log('Intent Name')
        cy.log(inName)

        // Entering to first row of rules table
        cy.log('Line 131')
        cy.get('tbody')
            .find('tr')
            .first()
            //.find('td:nth-child(2)')
            .click()
            .wait(500)

        // Clear Rules Name field
        cy.get('[data-cy="rule-name"]').clear()
        
        // Assert initial warning Message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')
        
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .click({force:true})
            .type(' ')

        /* At this moment Bug */
        // Assert warning message after add space to input field
        // cy.get('[class="v-messages__wrapper"]')
        //     .should('have.text','Der Name enthält ungültige Zeichen!')

        cy.get('[data-cy="rule-name"]').clear()

        // 1.2 Leave site with breadcrump 
        //Case 1: Rules name Empty
        cy.log('Line 533')
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()
            .wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 1.2 Leave site with breadcrump 
        //Case 2: Rules name not empty Empty but remove all steps
        cy.log('Line 547')

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

        cy.get('[data-cy="errorMessageBod"]')
            .should('have.text', ' Die Schritte der Rule sind ungültig ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // 1.2 Leave site with breadcrump 
        //Case 3: add a valid rules name and have at least one stape

        cy.log('Line 575')
        
        // Select steps
        // Select step
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})

        // Select Action or Response from list
        cy.get('[role="option"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[role="option"]').last().click()

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        // leave site with breadcrump
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(er)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules Table
        cy.log('Line 234')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(er))

        // 1.3 Leave Site by "Abbrechen" button
        cy.log('Line 613')
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
        cy.get('[data-cy="rule-table-search"]')
            .clear()

        //1.4. Check for duplicate Name
        cy.log('1.4. Check for duplicate Name')
        cy.log('Line 647')
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

                cy.log('Line 294')
                cy.get('[data-cy="errorMessageTitle"]')
                        .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

                // Clicking Abbrechen Button
                cy.get('[data-cy="abort-button"]')
                    .click()

                // Assert data in the Rules Table
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(1)')
                    .should('not.have.text', $dupRuleName.text())
            })
            
        // 1.5. Saving works if Data is Correct
        cy.log('Line 685')
        cy.log('1.5. Saving works if Data is Correct')

        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(x))

        // Select step
        // cy.get('[class="v-select__slot"]')
        cy.log('Line 699')
        cy.get('[class="col col-4"]').eq(1)
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[class="v-list-item__title"]').eq(2)
            .click()

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[class="v-menu__content theme--light menuable__content__active v-autocomplete__content"]')
            .find('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        cy.wait(500)
        // Assert Success Message

        cy.get('[data-cy="successMessageTitle"]')
                .should('have.text', ' Die Rule'+' "'+addValue+String(x)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules TAble
        cy.log('Line 726')
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(x))

        // delet one stape
        cy.log('Line 795')
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        cy.get('[data-cy="rule-remove-step"]').eq(1)
            .click()

        // Back to Rules Table
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()        

        // 6. Number of Rules must show correctly in Intent Table
        cy.log('Line 810')
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
export const onRulesBearbeiten = new rules()