const txa   = Math.floor(Math.random() * 4800);
const addValue = 'TextAnDmy'

export class response_text_anlegen {

    responseTexteAnlegen() {

        /* Response Anlegen Testing */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");

        
        // 1. Text Name should not be empty, error message should contain "Texte"; /Currently Bug/
        // 1.1 Response Teste Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving  /Currently Bug/

        //Enter to first row of Response Table
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
            //.wait(500)

        var resName
        // Save Response Name for letar Assertion
        cy.get('[class="v-text-field__slot"]')
            .find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name')
                    
        cy.get('@name').then((name) => {
          cy.log(name) //prints name
          resName = name
          cy.log(resName)
        })
        
        // Entering to Texte Tab
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()

        // Clicking responsetext-create
        cy.get('[data-cy="responsetext-create"]').click()
        
        //Assert warning notification
        cy.get('[class="v-messages__wrapper"]')
            .should('have.text','Der Text muss gesetzt sein')

        // Clicking Anlegen Button while Text field is empty
        cy.get('[data-cy="create-button"]').click()

        // success-remove
        cy.successRemove()

        // Add a valid Text Name
        cy.get('[data-cy="responsetext-create"]')
            .click()

        cy.get('[data-cy="responsetext-text"]')
            .type(addValue+String(txa))

        // Click Anlegen
        cy.get('[data-cy="create-button"]')
            .click()
            .wait(300)

        // Selecting Entire Table
        cy.selectEntireTbl()

        // 2. Check for successfully saved values
        // 2.1 Assert successfully saved Notification

        // Assert Successfully Saved Notification
        var idNr
        cy.get('tbody')
            .find('tr')
            .last()
            .find('td:nth-child(1)')
            .then(function($tbIdNr) {
                idNr = $tbIdNr.text()
                cy.log('idNr')
                cy.log(idNr)

                // Assert Success Message
                cy.get('[data-cy="successMessageTitle"]')
                    .should('have.text', ' Der Response Text'+String(idNr)+'wurde erfolgreich gespeichert ')
            })
        
        // 2. Check for successfully saved values
        // 2.2 Assert in the Texte table

        // Assert in Response Texte Table
        cy.get('tbody')
            .find('tr')
                .last()
            .find('td:nth-child(2)').then(function($text) {
                const text = $text.text()
                cy.wrap($text).should('have.text', addValue+String(txa))
            })
        // 3. Saving saves given data correctly
        cy.get('tbody')
            .find('tr')
            .then((tbLength) => {
                const countRow = tbLength.length
                
                cy.get('[data-cy="navDrawerResponses"]').click()
                
                cy.get('[data-cy="response-table-search"]')
                    .type(resName)

                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .should('have.text',' '+String(countRow)+' ')
            })
                    
        // 4. Leave site via menu or breadcrump does not save value
        cy.wait(500)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        // Entering to Texte Tab
        //cy.get('[class="v-slide-group__wrapper"]')
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()

        // Clicking responsetext-create
        cy.get('[data-cy="responsetext-create"]').click()

        cy.get('[data-cy="responsetext-text"]')
            .type('leaveWithBreadCrumb')

        // Leave Site via Bread Crumb
        cy.get('[role="tab"]')
            .contains('Texte')
            .click()

        // Selecting Entire Table
        cy.selectEntireTbl()
                
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(2)')
            .should('not.have.text','leaveWithBreadCrumb')        
    }
}
// Exportint class frontEnd to End2End to test
export const onResponsesTextAnlegen = new response_text_anlegen()