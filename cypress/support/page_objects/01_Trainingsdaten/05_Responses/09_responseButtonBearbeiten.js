const Resb     = Math.floor(Math.random() * 65000);
const Resbdub  = Math.floor(Math.random() * 25000);
const Resble   = Math.floor(Math.random() * 35000);
const resbut   = Math.floor(Math.random() * 48000);
const addValue = 'ResButbeDmyVal'

export class button_bearbeiten {

    buttonBearbeiten() {

        /* Enter to Trainingsdaten */
        cy.Trainingsdaten('Trainingsdaten','[data-cy="navDrawerResponses"]')

        // Assert URL after clicking Rules
        cy.url().should("eq", "http://10.61.135.11:8081/trainingsdaten/response/");
        
        // 1. Edit Name should not be empty, error message should contain "Name"
        // 1.1 Response Name
        //     1.1.1 Warning message below input field
        //     1.1.2 Error message after unsuccessful saving
        
        //Enter to a row of Response Table which contain highest no. of text
        var max_val2 = 0
        // Enter to Response table Row
        cy.wait(300)
        cy.get('tbody')
            .find('td:nth-child(2)')
            .then(($testFunc2) => {
                const vall2 = $testFunc2.text()
                const sp_vall2 = vall2.split(' ')
                                                                
                var num2
                for (num2=0; num2 < sp_vall2.length; num2++){                                                                           
                    if(Number(sp_vall2[num2]) > max_val2) {
                        max_val2 = sp_vall2[num2]
                        cy.log(max_val2)
                    }
                }
                cy.get('tbody')
                    .find('tr')
                    .find('td:nth-child(2)')
                    .contains(max_val2)
                    .click({force:true})
            })
        
        var resbutName
        // Save Response Name to a variable for letar Assertion
        cy.get('[data-cy="response-name"]')
            //.find('[data-cy="response-name"]')
                .invoke('val')
                    .as('name')
      
        cy.get('@name').then((name) => {
            cy.log(name) //prints name
            resbutName = name
        })

        // Locate Button Tab and enter to it
        cy.get('[role="tab"]')
            .contains('Buttons')
            .click()
            .wait(300)

        // add some response button

        const randonVal = ['responseBut1'+String(resbut), 'responseBut2'+String(resbut)]
        cy.wrap(randonVal).each((index) => {

            // Clicking Response Hinzufuegen
            cy.get('[data-cy="responsebutton-create"]')
                .click()

            cy.get('[data-cy="responsebutton-title"]')
                //.click({force:true})
                .type(index)

            // Add an Intent 
            cy.get('[role="combobox"]')
                .contains('Intent')
                .click({force:true})
                .get('[role="option"]')
                .last()
                .click()

            // Click Anlegen
            cy.get('[data-cy="create-button"]').eq(0)
                .click()

            cy.get('[role="tab"]')
                .contains('Buttons')
                .click()

            cy.get('[data-cy="success-remove"]')
                .click()
                .wait(300)
        })

        cy.log('Line 98')

        // Entering to last row of Button table
        cy.wait(400)
        cy.get('tbody')
            .find('tr')
            .last()
            .click()

        // clear response name
        cy.get('[data-cy="responsebutton-title"]').clear()
        cy.log('Line 109')
        //Assert warning notification
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Der Titel muss gesetzt sein')

        // add a space or '/' to input field /* Currently Bug, cannot be tested */

        // const space   = [' ', '/']
        
        // cy.wrap(space).each((index) => {

        //     cy.get('[data-cy="responsebutton-title"]')
        //     .click({force:true})
        //     .type(index)

        //     //Assert warning notification
        //     cy.get('[class="v-messages__wrapper"]')
        //         .should('have.text','Der Name enthält ungültige Zeichen!')

        //     // Remove space or '/'
        //     cy.get('[data-cy="responsebutton-title"]')
        //         .click({force:true})
        //         .clear()
        // })

        // 1. Try to save without response-button-title but with intent
        cy.get('[data-cy="save-button"]').click()

        // Assert Error Message
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')
        
        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // 2. Try to save with valid response-button-title but without intent
        cy.get('[data-cy="responsebutton-title"]')
            .type(addValue+String(Resb))
        
        // cy.get('[class="v-input__icon v-input__icon--clear"]').eq(1)
        //     .click()
        cy.get('[role="combobox"]').eq(0).clear()
        cy.get('[data-cy="responsebutton-title"]').click()

        //2.1 Assert warning notification Intent
        cy.get('[role="alert"]').eq(0)
            .should('have.text','Ein Intent muss ausgewählt sein')

        //cy.wait(500)

        cy.get('[data-cy="save-button"]').click()

        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()
        
        // 3. Check for successfully saved values
        // 3.1 Assert Notification
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resb))

        // Add an Intent 
        cy.get('[role="combobox"]')
            .contains('Intent')
            .click({force:true})
            .get('[role="option"]')
            .last()
            .click()
        
        // Click Speichern
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Der Response Button "'+addValue+String(Resb)+'"  wurde erfolgreich gespeichert ')
        cy.wait(300)
        // Closing Successfully Saved Notification
        cy.get('[data-cy="success-remove"]').click()

        // 3. Check for successfully saved values
        // 3.2 Assert in table

        // Assert saved data in response table
        cy.get('[data-cy="responsebutton-table-search"]')
            .type(addValue+String(Resb))
        
        // Selecting Entire Table
        //cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .contains(addValue+String(Resb))
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(Resb))
            })

        // clear search field
        cy.get('[data-cy="responsebutton-table-search"]')
            .clear()

        // 2. Check for duplicate name
        // 2.1 Response-button-title
        // 2.1.1 Error message after unsuccessful saving
        // 2.1.2 Valaue should be double in the Response table, assert response Table

        // At first add a New value to Response-button-title Name
        cy.get('[data-cy="responsebutton-create"]').click()

        // Add a valid Button Title
        cy.get('[data-cy="responsebutton-title"]')
            .type(addValue+String(Resbdub))
            
        // Add an Intent 
        cy.get('[role="combobox"]')
            .contains('Intent')
            .click({force:true})
            .get('[role="option"]')
            .last()
            .click()

        // Click Anlegen
        cy.get('[data-cy="create-button"]').eq(0)
            .click()
        cy.successRemove()

        // 2. Check for duplicate name
        // 2.1 Response Name
        // 2.1.1 Error message after unsuccessful saving
        // edit a button-title and try to save with an existing title
        cy.wait(200)
        cy.get('tbody')
            .find('tr')
            .first()
            .click()
        
        // Clear and add a title
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resbdub))

        //Try to save the changes
        cy.get('[data-cy="save-button"]').click()
        
        // Assert Error Notification
        cy.get('[data-cy="errorMessageTitle"]')
            .should('have.text',' Der Response Button konnte nicht gespeichert werden. ')

        // Close Error Notification
        cy.get('[data-cy="error-remove"]').click()

        // Abort editing
        cy.get('[data-cy="abort-button"]').click()
        
        // 2. Check for duplicate name
        // 2.1 Response-button-title
        //     2.1.2 Valaue should not be double in the Response table, assert response Table

        cy.get('[data-cy="responsebutton-table-search"]')
            .type(addValue+String(Resbdub))
        
        cy.get('tbody')
            .find('tr')
            .find('td:nth-child(2)')
            .contains(addValue+String(Resbdub))
            .then(function(checkDublicate) {
                cy.wrap(checkDublicate).should('have.length', 1)
            })

        // clear search field
        cy.get('[data-cy="responsebutton-table-search"]').clear()

        // 4. Leave site via menu or breadcrump, data must be saved
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // clear response-name
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type(addValue+String(Resble))

        //cy.get('[class="v-breadcrumbs__item"]')
        cy.get('[role="tab"]')
            .contains('Buttons')
            .click()
            .wait(300)

        // Assert Successful Notification
        cy.get('[data-cy="successMessageTitle"]')
            .should('have.text', ' Der Response Button'+' "'+addValue+String(Resble)+'" '+ ' wurde erfolgreich gespeichert ')
        
        // Remove "success-remove"
        cy.get('[data-cy="success-remove"]').click()

        // Assert saved data in response table
        cy.get('[data-cy="responsebutton-table-search"]')
            .type(addValue+String(Resble))

        // Selecting Entire Table
        cy.selectEntireTbl()
            
        // Assert Value in Response Table
        cy.get('tbody')
            .find('tr')
            .first()
            .find('td:nth-child(2)')
            .then(function($synName1) {
                cy.wrap($synName1).should('have.text', addValue+String(Resble))
            })

        // Clear response-table-search
        cy.get('[data-cy="responsebutton-table-search"]').clear()

        // 5. leave site via button "Abbrechen" navigates to table of synonyms and 
        //    does not save edited data

        // entering to first row of response-button-table
        cy.get('tbody')
            .find('tr')
            .first()
            .click()

        // Clear response-name
        cy.get('[data-cy="responsebutton-title"]')
            .clear()
            .type('randomResponseName')

        cy.get('[data-cy="abort-button"]').click()

        // Assert Response Table
        cy.get('[data-cy="responsebutton-table-search"]')
            .type('randomResponseName')
        
        cy.get('tbody')
            .find('tr')
            .should('not.have.text', 'randomResponseName')

        // clear response-table-search
        cy.get('[data-cy="responsebutton-table-search"]').clear()
    }
}

// Exportint class frontEnd to End2End to test
export const onResponsesButtonBearbeiten = new button_bearbeiten()