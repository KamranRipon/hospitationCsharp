const iEdit    = Math.floor(Math.random()  * 7000);
const newVal   = Math.floor(Math.random() * 13500);
const valErr   = Math.floor(Math.random() * 10500);
const addValue = 'DummyValue'

export class intent_example_bearbeiten {

    intentExampleBearbeiten() {

        // Open Trainingsdate Tab and enter to Intents
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')
        
        // calculate maxi examples or rules on an intent
        var max_val=0
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
        .find('td:nth-child(3)')
        .then(($testFunc2) => {
            const vall2 = $testFunc2.text()
            const sp_vall2 = vall2.split(' ')                                            
            var num2
            for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                if(Number(sp_vall2[num2]) > max_val) {
                    max_val = sp_vall2[num2]
                }
            }
        })
          
        // Enter to first row to intent table
        cy.wait(500)
        cy.get('tbody')
            .then((maxVal) => {
                cy.get('tbody')
                    .find('td:nth-child(3)')
                    .contains(max_val)
                    .click()
            })

        // Save intent Name for letar Assertion
        var inExName
        cy.get('[data-cy="intent-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })
    
        // Enter to Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
            .wait(500)
        cy.log('Line 33')
        // enter to first row
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            .wait(500)
            
        // turn off example-visual-annotation
        cy.get('[data-cy="example-visual-annotation"]')
            .click({force:true})

        // edit example-text filed
        cy.get('[data-cy="example-text"]')
            .clear()
        
        // 1. Name should not be empty, error message should contain "Name"
        // Enter to row which contain max example of the Intent table
                
        // Checking for a valid Name
        cy.get('[role="alert"]')
            .should('have.text', 'Der Text muss gesetzt sein')

        // 2. Name should not contain "spaces" or "/", saving impossible, 
        // Checking warning message for "space" or "/" 
        const space   = [' ', '/'] // Currently Bug
        // cy.wrap(space).each((index) => {
        //     cy.get('[data-cy="example-text"]')
        //     .type(index)

        // //Assert warning notification
        // cy.get('[role="alert"]')
        //     .should('be.visible')
        //     .should('have.text','Der Name enthält ungültige Zeichen!')

        // // Remove space or '/'
        // cy.get('[data-cy="example-text"]')
        //     .clear()
        // })
        // add a new name
        cy.get('[data-cy="example-text"]')
            .type(addValue+String(iEdit))

        cy.get('[data-cy="save-button"]')
            .click()
            .wait(500)

        // select entire table
        cy.selectEntireTbl()

        // Assert Successfully Saved Notification
        var idNr
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Example'+String(idNr)+'wurde erfolgreich gespeichert ')
            })
        //success-remove
        cy.successRemove()

        // 3. Check for successfully saved values
        cy.log('Line 119')        
        
        // 3. Check for successfully saved values
        // 3.2 Assert in table
        cy.get('[data-cy="example-table-search"]')
            .type(addValue+String(iEdit))

        //assert on table
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .should('have.text', addValue+String(iEdit))

        // clear search field
        cy.get('[data-cy="example-table-search"]').clear()

        // 5. Leave site via menu or breadcrump, data must be saved
        // enter to first row
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            .wait(500)
            
        // turn off example-visual-annotation
        cy.get('[data-cy="example-visual-annotation"]')
            .click({force:true})

        // edit example-text filed
        cy.get('[data-cy="example-text"]')
            .clear()
            .type(addValue+String(newVal))

        cy.log('Line 151')
        // leave site via bread crumb 
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()

        cy.get('[data-cy="example-table-search"]').type(addValue+String(newVal))

        //assert on table
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .should('have.text', addValue+String(newVal))
                
        // 6. Leave site via Abbrechen button, data must not be saved
        // enter to first row
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            .wait(500)
            
        // turn off example-visual-annotation
        cy.get('[data-cy="example-visual-annotation"]')
            .click({force:true})

        // edit example-text filed
        cy.get('[data-cy="example-text"]')
            .clear()
            .type('someVal')

        cy.log('Line 183')
        // leave site via Abbrechen button 
        cy.get('[data-cy="abort-button"]')
            .click()

        cy.get('[data-cy="example-table-search"]').type('someVal')

        //assert on table
        cy.get('tbody')
            .find('tr')
            //.find('td:nth-child(2)')
            .should('not.have.text', 'someVal')

        // clear example search table
        cy.get('[data-cy="example-table-search"]').clear()

        // select entire table
        cy.selectEntireTbl()

        // 1.3 Saving saves given data correctly
        cy.log('Line 120')
        cy.get('tbody')
            .find('tr')
            .then((exTbSize) => {
                const tbSize = exTbSize.length

                // return to Intent table
                cy.get('[data-cy=navDrawerIntents]')
                    .click()

                cy.get('[data-cy="intent-table-search"]')
                    .type(inExName)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(3)')
                    .should('have.text', ' '+String(tbSize)+' ')
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleBearbeiten = new intent_example_bearbeiten()