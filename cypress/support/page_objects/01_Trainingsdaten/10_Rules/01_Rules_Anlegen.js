const i = Math.floor(Math.random() * 5000);
const b = Math.floor(Math.random() * 1000);
const r = Math.floor(Math.random() * 1500);
const a = Math.floor(Math.random() * 2000);

const addValue = 'DummyValue'

export class rules_anlegen {

    rulesAnlegen() {

        /* Rules Anlegen Testing */
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')
     
        // Assert URL after clicking Rules
        cy.url().should("eq", "http://localhost/trainingsdaten/intent/");
        
        // A. Synonym Anlegen
        /* 
        1. Name should not be empty, error message should contain "Name"
            1.1 Synonym
                1.1.1 Warning message
                1.1.2 Warning Notification
            1.2 Synonyms Example
                1.1.1 Warning message
                1.1.2 Warning Notification
        2. Check for duplicate name
            2.1 Synonym
            2.2 Example
        3. Check for successfully saved values
            3.1 Assert Notification
            3.2 Assert in table
                3.2.1 Assert Synonym name in Synonym talbe
                3.2.2 Assert name in example table
                3.2.3 Assert example number for each synonym in synonym table
        4. Leave site via menu or breadcrump, data must not be saved
        */

        /* Add Action Name. Require to test Rules */
        cy.get('[data-cy="navDrawerActions"]').click()

        // Clicking Action Hinzufuegen
        cy.get('[data-cy="action-create"]').click()
        
        // add a Name to action
        cy.get('[data-cy="action-name"]')
            .type('Action'+String(a))
        
        // add a descriptions or python code
        cy.get('[data-mode-id="python"]')
            .type('pring("Hello World!")')

        // Clicking Anlegen
        cy.get('[data-cy="create-button"]').click()

        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Action'+' "Action'+String(a)+'" '+ 'wurde erfolgreich gespeichert ')

        // Select Entire Synonym Table
        cy.selectEntireTbl()
        // Assert Data in Action Table
        cy.get('tbody tr').last()
            .find('td:nth-child(1)')
            .should('have.text', 'Action'+String(a))
        
        cy.wait(500)
        // Closing success message
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        // 1.1 Rules Name Anlegen
        // 1.1.1 Warning message

        // Entering to Intents
        cy.get('[data-cy="navDrawerIntents"]')
            .click({force:true})
            .wait(500)

        // Clicking intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .click({force:true})
        
        // Add Intent Name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type(addValue+String(i))
        
        // Assert Visibility of remove button
        cy.get('[class="v-input__icon v-input__icon--clear"]')
            .find('button.v-icon')
            .should('be.visible')
        
        // Add a description
        cy.get('[data-cy="intent-description"]')
            .clear()
            .type(addValue+String(b))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(500)
        
        cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
            .click()

        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]').click()
        // Assert initial warning Message
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name muss gesetzt sein')
        
        // Add space to rules name input field
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(' ')
        
        // Assert warning message after add space to input field
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Name enthält ungültige Zeichen!')

        // Try to save with empty name
        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(500)
        
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(r))

        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})
        
        cy.get('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[role="option"]').last().click()
        
        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]')
            .click()

        cy.get('[data-cy="create-button"]')
            .click()
        
        cy.wait(500)
        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(r)+'" '+ 'wurde erfolgreich gespeichert ')

        // Assert Data in Rules TAble
        cy.get('tbody tr')
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(r))

        //3. Check for duplicate Name
        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .type(addValue+String(r))

        // Select a step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[role="option"]').last()
            .click()
        
        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]').click()
                
        cy.get('[data-cy="create-button"]').click()

        cy.wait(500)

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        //4. Check for duplicate Name
        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]').click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .type(addValue+String(r*a))
        
        cy.get('[data-cy="create-button"]').click()

        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[class="v-icon notranslate theme--dark"]').eq(0)
            .click()

        //5. Saving works if Data is Correct
        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[role="listbox"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[role="option"]').last().click()

        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]').click()

        cy.get('[data-cy="create-button"]').click()

        cy.wait(500)
        // Assert Success Message
        cy.get('[data-cy="successMessageTitle"]')
                .should('have.text', ' Die Rule'+' "'+addValue+String(r*a)+'" '+ 'wurde erfolgreich gespeichert ')
        
        // Assert Data in Rules TAble
        cy.get('tbody tr')
            .last()
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(r*a))

        // 6. Number of Rules must show correctly in Intent Table
        cy.get('tbody tr')
            .then(function($countTr) {
                const NoOfRules =$countTr.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})

                cy.get('[data-cy="intent-table-search"]')
                    .type(addValue+String(i))

                cy.get('tbody tr')
                    .find('td:nth-child(4)')
                    .should('have.text', ' '+String(NoOfRules)+' ')
            })

        // Clear Search Field
        cy.get('[data-cy="intent-table-search"]')
            .clear()

        // 7. Leave Site with Breadcrump does not save data
        cy.get('tbody tr')
            .last()
            .click()

        cy.get('[class="v-slide-group__wrapper"]')
            .find('[class="v-tab"]').eq(1)
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(r*i))  

        // Select step
        cy.get('[class="v-select__slot"]')
            .contains('Step Typ auswählen')
            .click({force:true})

        cy.get('[role="listbox"]')
            .contains('Action')
            .click({force:true})
        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()
        
        cy.get('[role="option"]').last().click()
            
        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        // Assert data in Rules table. Data must not be in the table
        cy.get('[data-cy="rule-table-search"]')
            .type(addValue+String(r*i))
        
        cy.get('tbody tr')
            .find('td:nth-child(1)')
            .should('not.have.text', addValue+String(r*i))
    }
}

// Exportint class frontEnd to End2End to test
export const onRulesAnlegen = new rules_anlegen() 