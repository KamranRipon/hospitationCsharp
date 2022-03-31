const intent = Math.floor(Math.random() * 5000);
const besheibung = Math.floor(Math.random() * 1000);
const rule = Math.floor(Math.random() * 1500);
const action = Math.floor(Math.random() * 2000);

const addValue = 'DummyValue'

export class rules_anlegen {

    rulesAnlegen() {

        /* Rules Anlegen Testing */
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')
     
        // Assert URL after clicking Rules
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/intent/`);

        /* Add Action Name. Require to test Rules */
        cy.get('[data-cy="navDrawerActions"]').click()

        // Clicking Action Hinzufuegen
        cy.get('[data-cy="action-create"]').click()
        
        // add a Name to action
        cy.get('[data-cy="action-name"]')
            .type('aktion'+String(action))
        
        // // add a descriptions or python code
        // cy.get('[data-mode-id="python"]')
        //     .type('Hello World')

        // Clicking Anlegen
        cy.get('[data-cy="create-button"]').click()
        cy.wait(300)

        // // Assert Success Message
        // cy.get('[data-cy="successMessageTitle"]')
        //     .should('have.text', ' Die Action'+' "Action'+String(action)+'" '+ 'wurde erfolgreich gespeichert ')

        // // Select Entire Synonym Table
        // cy.selectEntireTbl()
        // // Assert Data in Action Table
        // cy.wait(300)
        // cy.get('tbody tr').last()
        //     .find('td:nth-child(1)')
        //     .should('contain', 'Action'+String(action))
        
        // Closing success message
        cy.get('[data-cy="success-remove"]')
            .click()

        // 1. Name should not be empty, error message should contain "Name"
        
        // 1.1 Warning message below input field

        // Entering to Intents
        cy.get('[data-cy="navDrawerIntents"]')
            .click({force:true})
            .wait(300)

        // Clicking intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .click({force:true})
        
        // Add Intent Name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type(addValue+String(intent))
        
        // Assert Visibility of remove button
        // cy.get('[title="Name löschen"]')
        //     //.find('button.v-icon')
        //     .should('be.visible')
        
        // Add a description
        cy.get('[data-cy="intent-description"]')
            .clear()
            .type(addValue+String(besheibung))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(400)
        
        // cy.get('[class="v-icon notranslate theme--dark"]').eq(1)
        //     .click()
        cy.get('[data-cy="success-remove"]').click()

        // cy.get('[class="v-slide-group__wrapper"]')
        //     .find('[class="v-tab"]').eq(1)
        cy.get('[role="tab"]')
            .contains('Rules')
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]').click()
        // Assert initial warning Message
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Name muss gesetzt sein')
        cy.log('Line 117')
        
        // Try to save with empty name
        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(500)
        
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[data-cy="error-remove"]')
            .click()
        
        // 2. Check for successfully saved values

        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(rule))

        // Select a step
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})
        
        cy.get('[role="option"]')
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
        cy.log('Line 165')
        cy.wait(400)

        // 2.1 Assert Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Die Rule'+' "'+addValue+String(rule)+'" '+ 'wurde erfolgreich gespeichert ')
        
        //cy.get('[data-cy="success-remove"]').click()
        
        // 2.2 Assert in Table
        cy.wait(300)
        cy.get('tbody tr')
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(rule))
        cy.log('Line 175')

        // 3. Check for duplicate name

        //     3.1 Error message after unsuccessful saving 
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .type(addValue+String(rule))

        // Select a step
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})

        cy.get('[role="option"]')
            .contains('Action')
            .click({force:true})

        cy.get('[data-cy="rule-new-step-item-autocomplete"]')
            .click()

        cy.get('[role="option"]').last()
            .click()
        
        // Add a step by clicking "+"
        cy.get('[data-cy="rule-add-step"]').click()
                
        cy.get('[data-cy="create-button"]').click()
        cy.log('Line 204')
        cy.wait(300)

        // 3.1 Error message after unsuccessful saving 
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Die Rule konnte nicht gespeichert werden. ')

        cy.get('[data-cy="error-remove"]').eq(0)
            .click()

        cy.get('[class="v-breadcrumbs__item"]')
            .contains('Rules')
            .click()

        // 4. Number of Rules must show correctly in Intent Table
        cy.wait(200)
        cy.get('tbody tr')
            .then(function($countTr) {
                const NoOfRules =$countTr.length

                // Back to Intents
                cy.get('[data-cy="navDrawerIntents"]')
                    .click({force:true})

                cy.get('[data-cy="intent-table-search"]')
                    .type(addValue+String(intent))

                cy.get('tbody tr')
                    .find('td:nth-child(4)')
                    .should('contain', ' '+String(NoOfRules)+' ')
            })

        // Clear Search Field
        cy.get('[data-cy="intent-table-search"]')
            .clear()

        // 5. Leave Site with Breadcrump/Menu does not save data
        cy.wait(300)
        cy.get('tbody tr')
            .last()
            .click()

        // cy.get('[class="v-slide-group__wrapper"]')
        //     .find('[class="v-tab"]').eq(1)
        cy.get('[role="tab"]')
            .contains('Rules')
            .click()

        // Entering Rules Hinzufuegen
        cy.get('[data-cy="rule-create"]')
            .click()

        // Clear and add a valid Rule name
        cy.get('[data-cy="rule-name"]')
            .clear()
            .type(addValue+String(rule * intent))

        // Select step
        cy.get('[data-cy="rule-new-step-type-select"]')
            .click({force:true})

        cy.get('[role="option"]')
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
            .type(addValue+String(rule * intent))
        
        cy.wait(200)
        cy.get('tbody tr')
            .find('td:nth-child(1)')
            .should('not.have.text', addValue+String(rule*intent))
    }
}

// Export class
export const onRulesAnlegen = new rules_anlegen() 