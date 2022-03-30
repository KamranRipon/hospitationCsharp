const iEdit = Math.floor(Math.random() * 200000);
const newVal = Math.floor(Math.random() * 130500);
const valErr = Math.floor(Math.random() * 100500);
const addValue = 'DummyValue'
export class intent_bearbeiten {

    intentBearbeiten() {

        // Open Trainingsdate Tab and enter to Intents
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')

        // Enter to Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]')
            .should('be.visible')
            .click()

        // add an intent-name and intent-descriptions
        cy.addIntent(addValue+String(iEdit))

        // create-button
        cy.get('[data-cy="create-button"]')
            .should('be.visible')
            .click()
            .wait(400)
        //success-remove
        cy.successRemove()

        // return to Intent
        cy.get('[data-cy="navDrawerIntents"]').click()

        // Selecting Entire Table
        cy.selectEntireTbl()

        // // calculate maxi examples or rules on an intent
        // var max_val=0
        // //cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
        // cy.get('tbody tr')
        // .find('td:nth-child(3)')
        // .then(($testFunc2) => {
        //     const vall2 = $testFunc2.text()
        //     const sp_vall2 = vall2.split(' ')
        //     var num2
        //     for (num2=0; num2 < sp_vall2.length; num2++){
        //         if(Number(sp_vall2[num2]) > max_val) {
        //             max_val = sp_vall2[num2]
        //         }
        //     }
        // })
        
        // 1. Name should not be empty, error message should contain "Name"
        // Enter to row which contain max example of the Intent table
        cy.log('Line 55')
        // cy.get('tbody')
        //     .then((maxVal) => {
        //         cy.get('tbody')
        //             .find('td:nth-child(3)')
        //             .contains(max_val)
        //             .click()
        //     })
        cy.wait(300)
        cy.get('tbody')
            .find('tr').eq(-2)
            //.first()
            .click()
        
        // Remove Name by clicking "X"
        //cy.get('[title="Name löschen"]').click()
        // clear intent-name
        cy.get('[data-cy="intent-name"]').clear()
        
        // 1.1 Warning message below input field
        cy.get('[role="alert"]').eq(0)
            .should('have.text', 'Der Name muss gesetzt sein')

        // 1.2 Warning message for space and Slace
        const space   = [' ', '/']
        cy.wrap(space).each((index) => {
            cy.get('[data-cy="intent-name"]')
            .type(index)

            //Assert warning notification
            cy.get('[role="alert"]').eq(0)
                .should('have.text','Der Name enthält ungültige Zeichen!')

            // Remove space or '/'
            cy.get('[data-cy="intent-name"]')
                .clear()
        })
        // 1.3 Error message after unsuccessful saving 
        
        cy.get('[data-cy="save-button"]').click()
        //Assert Error message, indication didn't able to save data
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das','Intent')
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // 2. Check for successfully saved values
        cy.log('Line 91')
        cy.addIntent(addValue+String(newVal))
        // save-button
        cy.get('[data-cy="save-button"]').click()
        cy.wait(600)
        cy.log('newVal: ', newVal)
        // 2.1 Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue+String(newVal) +'" wurde erfolgreich gespeichert ')
        })
        
        //success-remove
        cy.successRemove()
        
        // 2.2 Assert in table
        cy.get('[data-cy="intent-table-search"]').type(addValue+String(newVal))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in intent-table
        cy.get('tbody').find('tr')
            .find('td:nth-child(1)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(newVal))
            })

        // clear search field
        cy.get('[data-cy="intent-table-search"]').clear()

        /* 3.Checking for Duplicate Name: Name cannot be known in Intent
           3.1 Error message after unsuccessful saving */
                
        cy.log('Line 124')
        // Enter to Intent Hinzufuegen
        cy.get('[data-cy="intent-create"]').click()
        cy.wait(500)
        // add intent
        cy.addIntent(addValue+String(iEdit))
        // create-button
        cy.log('Line 136')
        cy.get('[data-cy="create-button"]').click()
        cy.wait(500)
        // Assert Error message after unsuccessful saving
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Das', 'Intent')
        cy.wait(1000)
        // Close Error Notification
        //cy.get('[data-cy="error-remove"]').click()
        
        // Leave site by clicking Intests
        cy.get('[data-cy="navDrawerIntents"]')
            .click()
            .wait(200)
        
        // Select Entire Synonym Table
        cy.selectEntireTbl()

        // 5. Leave site via menu or breadcrump, data must be saved
        // cy.get('tbody')
        //     .then((maxVal) => {
        //         cy.get('tbody')
        //             .find('td:nth-child(3)')
        //             .contains(max_val)
        //             .click()
        //     })
        cy.wait(300)
        cy.get('tbody')
            .find('tr').eq(-2)
            .click()

        // clear action name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type(addValue+String(valErr))

        cy.get('[data-cy="navDrawerIntents"]').click()
        cy.log('Line 158')
        cy.wait(1000)
        // Assert success Message
        cy.get('[data-cy="successMessageTitle"]')
            .then((successMsg) => {
                expect(successMsg).to.have.text(' Das Intent "'+ addValue+String(valErr) +'" wurde erfolgreich gespeichert ')
        })
        
        //success-remove
        cy.successRemove()
       
        // search value
        cy.get('[data-cy="intent-table-search"]')
            .type(addValue+String(valErr))

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('have.text', addValue+String(valErr))

        // clear search field
        cy.get('[data-cy="intent-table-search"]')
            .clear()
        
        // 6. Leave site via Abbrechen button, data must not be saved
        // cy.get('tbody')
        //     .then((maxVal) => {
        //         cy.get('tbody')
        //             .find('td:nth-child(3)')
        //             .contains(max_val)
        //             .click()
        //     })
        cy.get('tbody')
            .find('tr').eq(-2)
            .click()


        // clear intent name
        cy.get('[data-cy="intent-name"]')
            .clear()
            .type('someName')

        // click Abort Button
        cy.get('[data-cy="abort-button"]').click()

        cy.get('[data-cy="intent-table-search"]')
            .type('someName')

        // Select Entire Synonym Table
        cy.selectEntireTbl()

        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)')
            .should('not.have.text', 'someName')

        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentBearbeiten = new intent_bearbeiten()