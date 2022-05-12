const xTx   = Math.floor(Math.random() * 6500);
const xTxLe = Math.floor(Math.random() * 7500);
const addValue = 'resTxBearDmy'

export class response_text_bearbeiten {

    responseTexteBearbeiten() {

        /* Response Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", `${Cypress.config().baseUrl}/trainingsdaten/response/`);
        //cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");

        // 1. Edit Name should not be empty, error message should contain "Text"
        // 1.1 Response Texte Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        // Entering to first of
        cy.wait(500)

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        var max_val2 = 0
        // Enter to Response table Row
        cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                var sp_vall2 = vall2.split(" ")
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){
                    
                    if(sp_vall2[num2] > max_val2) {
                        max_val2 = sp_vall2[num2]
                        cy.log(max_val2)
                    }
                }
                cy.get('.v-data-table__wrapper > table:nth-child(1) > tbody:nth-child(3)')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })
        
        // Save Response Name for letar Assertion
        var resName1
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name1')
                    
        cy.get('@name1').then((name1) => {
            cy.log(name1) //prints name
            resName1 = name1
            cy.log(resName1)
        })    

        // Entering to Texte Tab
        //cy.get('[class="v-slide-group__wrapper"]')
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()
            .wait(500)

        // Selecting Entire Table
        cy.selectEntireTbl()
        
        // Entering to a Texte Table Row
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .last()
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .clear()
        cy.log('Line 80')
        //Assert warning notification
        cy.get('[role="alert"]')
            .should('have.text','Der Text muss gesetzt sein      ')

        // Clicking Anlegen Button while Text field is empty
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Nicht Möglich,
        cy.errorMessageTitle('[data-cy="errorMessageTitle"]', 'Die', 'Response')
        
        //Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // add a valid text name and assert
        //  1. notification
        //  2. in the table
        cy.get('[data-cy="responsetext-text"]')
            .type(addValue+String(xTx))

        // click save-button
        cy.get('[data-cy="save-button"]')
            .click()
            .wait(300)

        // Selecting Entire Table
        cy.selectEntireTbl()

        // Assert Successfully Saved Notification
        var idNr2
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr2) {
                idNr2 = $tbIdNr2.text()
                cy.log('idNr')
                cy.log(idNr2)

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Der Response Text'+String(idNr2)+'wurde erfolgreich gespeichert ')
            })

        // Remove success notification
        cy.get('[data-cy="success-remove"]').click()
        
        // 2. Check for successfully saved values
        // 2.2 Assert in the Texte table
        // Assert in Response Texte Table
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {
                const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(xTx))
            })

        // 3. Saving saves given data correctly
        cy.get('tbody')
            .find('tr')
            .then((tbLength) => {
                const countRow = tbLength.length
                
                cy.get('[data-cy="navDrawerResponses"]').click()
                
                cy.get('[data-cy="response-table-search"]')
                    .type(resName1)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .should('have.text',' '+String(countRow)+' ')
            })
        
        // clear resonse-table-search
        cy.get('[data-cy="response-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(1)').then((responName) => {

                cy.get('[data-cy="response-table-search"]')
                    .type(resName1)
                    .get('tbody')
                    .find('tr')
                    .last()
                    .click()
            })

        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()

        // Selecting Entire Table
        cy.selectEntireTbl()

        // enter to a Texte Row
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // responsetext-text
        cy.get('[data-cy="responsetext-text"]')
            .clear()
            .type(addValue+String(xTxLe))

        // leave site by clicken bread crumb
        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()

        // Assert value in Texte table
        cy.get('[data-cy="responsetext-table-search"]')
            .type(addValue+String(xTxLe))
        
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(2)')
            .should('have.text', addValue+String(xTxLe))

        // clear resonse-table-search
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data
        // Selecting Entire Table
        cy.selectEntireTbl()

        // enter to a Texte Row
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // responsetext-text
        cy.get('[data-cy="responsetext-text"]')
            .clear()
            .type('responseTextName')

        // leave site by clicken abbrechen
        cy.get('[data-cy="abort-button"]')
            .click()

        // Assert value in Texte table
        cy.get('[data-cy="responsetext-table-search"]')
            .type('responseTextName')
        
        cy.log('Line 233')
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'responseTextName')

        // clear response-table-search
        cy.get('[data-cy="responsetext-table-search"]')
            .clear()
    }
}
// Exportint class frontEnd to End2End to test
export const onResponsesTextBearbeiten = new response_text_bearbeiten()