const exm = Math.floor(Math.random() * 2500)
const addExample = 'testExample'

export class intent_example_hinzufuegen {
    
    intentExampleHinzufuegen() {

        // Open Trainingsdate Tab and enter to Story
        cy.Trainingsdaten('[data-cy="navDrawerIntents"]')

        // Assert URL after clicking Story
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/intent/");

        // 1.1 Example must not be empty -- // Currently Bug //
        // Entering Intent Tab
        //cy.get('[data-cy=navDrawerIntents]')
        //    .click()
            
        // Entering to first row of the Intent Table
        cy.log('Line 20')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .first()
            .click({force:true})

        // Save Response Name for letar Assertion
        var inExName
        cy.get('[data-cy="intent-name"]')
                .invoke('val').as('name')
                    
        cy.get('@name').then((name) => {
            inExName = name
        })

        cy.log('Line 35')
        // Entering to Example Tab
        cy.get('[role="tab"]')
            .contains('Examples')
            .click()
            //.wait(500)
        
        // Clicking Example Hizufuegen Button
        cy.get('[data-cy="create-intent-example"]')
            .click()
            .wait(200)

        // Assert initial warning Message 
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Text muss gesetzt sein')

        // Anlegen  & weiteres Example 
        cy.get('[data-cy="example-text"]')
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(1)
            .click()
            //.wait(500)

        // success remove
        cy.successRemove()
        
        // Add an example 
        cy.get('[data-cy="example-text"]')
            .click({force:true})
            .type(addExample+String(exm))
        
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
            .wait(500)

        // select entire table
        cy.selectEntireTbl()

        // Assert Successfully Saved Notification
        var idNr
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Das Example'+String(idNr)+'wurde erfolgreich gespeichert ')
            })

        // Assert in Intent-Example Table
        cy.log('Line 88')
        cy.wait(300)
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(2)').then(function($text) {
                //const text = $text.text()
                cy.wrap($text).should('have.text', addExample+String(exm))
            }) 

        // 1.2 Leave site via menu or breadcrump is possible
        // doesn't save given data
        cy.get('[data-cy="create-intent-example"]')
                .click()

        // Add an example 
        cy.get('[data-cy="example-text"]')
            .type('breadcrump')

        cy.get('[class="v-breadcrumbs theme--light"]')
            .contains(' Examples ')
            .click({force:true})

        // select entire table
        cy.selectEntireTbl()
        
        // Assert value in example table
        cy.get('tbody')
            .find('td:nth-child(2)')
            .should('not.have.text', 'breadcrump')

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
                    .wait(500)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(3)')
                    .should('have.text', ' '+String(tbSize)+' ')
            })
    }
}
// Exportint class frontEnd to End2End to test
export const onIntentExampleHinzufuegen = new intent_example_hinzufuegen()